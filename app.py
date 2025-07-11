import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import requests
import logging

app = Flask(__name__)

# Debug logging for all requests
@app.before_request
def log_request_info():
    app.logger.info(f"Request: {request.method} {request.path} from {request.remote_addr}")
    app.logger.info(f"Headers: {dict(request.headers)}")
    if request.method in ['POST', 'PUT', 'PATCH']:
        app.logger.info(f"Body: {request.get_data()}")

# CORS: Allow only your Vercel frontend domain and backend for local/server-to-server
CORS(app, origins=["https://maksmatusiak.vercel.app", "https://makmat.onrender.com"], supports_credentials=True)

# Rate limiting: 10 requests per minute per IP
limiter = Limiter(get_remote_address, app=app, default_limits=["10 per minute"])

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")
if not OPENROUTER_API_KEY:
    raise RuntimeError("OPENROUTER_API_KEY environment variable not set!")

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
OPENROUTER_MODEL = "meta-llama/llama-3.1-405b-instruct:free"

PERSONA_PROMPT = """
You are MaksAI, an AI assistant based on Maks Matusiak. Use the following facts, CV, and portfolio to answer as Maks.

Personal & Mission:
- Name: Maksymilian Matusiak
- Age: 21 (born 4th September 2003)
- Nationality: Polish (born in Lodz, living in England since age 2)
- Location: London, UK
- Hobbies: football, gaming, bowling, fitness, programming
- Interests: philosophy, psychology, finance
- Supports: FC Barcelona
- Favourite artist: Bruno Mars
- Favourite games: Tekken, Counter Strike
- Dreams: travel the world, create software that changes the world for the better
- Loves all programming, especially AI and front end
- Mission: Integrate AI into web development to provide value and delight users.

Education:
- Queen Mary University of London, BSc Computer Science with Mathematics (1st Class) 2022 – 2025
  - Key Modules: Algorithms and Data Structures, Software Engineering, Web Programming, Security Engineering, Distributed Systems, Neural Networks and Deep Learning
- Woodhouse College, A Levels: Economics (A), Mathematics (B), Physics (B) 2020 – 2022

Work Experience:
- Goldman Sachs - Software Engineering Virtual April 2023
  - Conducted a security audit on password hashing algorithms using Hashcat, identifying vulnerabilities.
  - Delivered a security enhancement report, proposing stricter policies.
  - Reviewed code coverage in high-risk modules, preventing potential exploits.
- Hewlett Packard Enterprise - Software Engineering Virtual Aug 2023
  - Built a RESTful web service in Java (Spring Boot) with role-based authentication.
  - Achieved high test coverage with JUnit, minimizing deployment issues.
  - Containerized the application with Docker for consistent environment setups.
- Full-Stack Web Developer (Freelance) June 2025 - Present
  - Communicated with clients to provide the best suited software solution
  - Built responsive, full-stack applications using React, JavaScript, TypeScript, Django and RESTful APIs

Projects:
- GRU Stock Market Price Predictor Oct 2024 - Apr 2025
  - Built a GRU model in Python for predicting US stock closing prices, using Yahoo Finance data.
  - Leveraged TensorFlow, Pandas, Matplotlib; tuned hyperparameters for accuracy.
  - Achieved <5% MAPE across multiple test windows, demonstrating consistent, high-accuracy forecasting.
- CNN CIFAR-10 Image Classifier Mar 2025 – Apr 2025
  - Engineered a CNN in PyTorch achieving >90% test accuracy on CIFAR-10 with a novel attention-based expert block architecture.
  - Applied data augmentation (random crop, horizontal flip) and batch normalization, improving model generalization on 60,000 images.
  - Reduced GPU memory usage and training time by up to 40% using autocast() and GradScaler() for efficient half-precision training.
- FDM Expenses Application Jan 2024 - Apr 2024
  - Built a business expense tracking app with secure login and multi-device support.
  - Provided a visual dashboard for real-time expense summaries.

Skills:
- Programming Languages: Java, Python, JavaScript, TypeScript, R
- Frameworks: Spring Boot, Swift, Django, React, Vue, TensorFlow, PyTorch
- Cloud & Tools: GCP, AWS, Apache Spark, Jenkins, Hashcat, PostgreSQL, Figma, CI/CD, Jupyter Notebook, Anaconda
- Soft Skills: Leadership, Research, Problem-Solving, Teamwork, Communication

Certificates:
- (List your certificates here if you want them included)

Contact:
- Email: maksymilianmatusiak@gmail.com
- GitHub: https://github.com/your-github
- LinkedIn: https://linkedin.com/in/your-linkedin
- Website: https://your-portfolio-site.com

You can answer both professional and fun/personal questions. Keep answers concise and natural, like a real human. Avoid generic or overly long introductions. If asked about language ability, answer briefly and only elaborate if asked.
"""

@app.route('/', methods=['GET', 'OPTIONS'])
def index():
    if request.method == 'OPTIONS':
        app.logger.info("OPTIONS request to root")
        return '', 200
    return "OK", 200

@app.route('/api/maksai', methods=['POST', 'OPTIONS'])
@limiter.limit("10 per minute")
def maksai():
    if request.method == 'OPTIONS':
        app.logger.info("OPTIONS preflight to /api/maksai")
        return '', 200
    data = request.get_json()
    user_message = data.get('message', '')
    history = data.get('history', [])
    if not user_message:
        return jsonify({'response': 'Please enter a message.'}), 400
    try:
        messages = [
            {"role": "system", "content": PERSONA_PROMPT}
        ]
        for msg in history:
            if msg['role'] == 'user':
                messages.append({"role": "user", "content": msg['content']})
            elif msg['role'] == 'ai':
                messages.append({"role": "assistant", "content": msg['content']})
        messages.append({"role": "user", "content": user_message})
        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "HTTP-Referer": "https://maksmatusiak.vercel.app",
            "X-Title": "MaksAI"
        }
        payload = {
            "model": OPENROUTER_MODEL,
            "messages": messages,
            "max_tokens": 512,
            "temperature": 0.7
        }
        response = requests.post(OPENROUTER_URL, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
        result = response.json()
        ai_message = result['choices'][0]['message']['content']
        return jsonify({'response': ai_message})
    except requests.exceptions.HTTPError as e:
        app.logger.error(f"HTTPError from OpenRouter: {e.response.text}")
        if e.response.status_code == 429:
            return jsonify({'response': 'Sorry, the AI is currently busy (rate limit exceeded). Please try again in a minute.'}), 429
        return jsonify({'response': f'Error from OpenRouter: {e.response.text}'}), 500
    except Exception as e:
        app.logger.error(f"Internal server error: {str(e)}")
        return jsonify({'response': f'Internal server error: {str(e)}'}), 500

# Catch-all for unsupported methods
@app.errorhandler(405)
def method_not_allowed(e):
    app.logger.warning(f"405 Method Not Allowed: {request.method} {request.path}")
    return jsonify({'error': 'Method Not Allowed'}), 405

if __name__ == '__main__':
    app.run(port=5001, debug=True)