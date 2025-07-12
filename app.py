import os
from dotenv import load_dotenv
load_dotenv()
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import requests
import logging
import random 

app = Flask(__name__)

# Debug logging for all requests
@app.before_request
def log_request_info():
    app.logger.info(f"Request: {request.method} {request.path} from {request.remote_addr}")
    app.logger.info(f"Headers: {dict(request.headers)}")
    if request.method in ['POST', 'PUT', 'PATCH']:
        app.logger.info(f"Body: {request.get_data()}")

# CORS: Allow only your Vercel frontend domain and backend for local/server-to-server
CORS(app, origins=[
    "https://maksmatusiak.vercel.app",
    "https://makmat.onrender.com",
    "http://localhost:5173"
], supports_credentials=True)

# Rate limiting: 10 requests per minute per IP
limiter = Limiter(get_remote_address, app=app, default_limits=["10 per minute"])

# API Configuration
TOGETHER_API_KEY = os.environ.get("TOGETHER_API_KEY")
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")

# Check if at least one API key is available
if not TOGETHER_API_KEY and not OPENROUTER_API_KEY:
    raise RuntimeError("At least one API key (TOGETHER_API_KEY or OPENROUTER_API_KEY) must be set!")

TOGETHER_URL = "https://api.together.xyz/v1/chat/completions"
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

TOGETHER_MODEL = "deepseek-ai/deepseek-coder-33b-instruct"  # DeepSeek R1 Distill Llama 70B Free model
OPENROUTER_MODEL = "meta-llama/llama-3.1-405b-instruct:free"  # OpenRouter fallback model

# UPDATED PERSONA_PROMPT
PERSONA_PROMPT = """
You are MaksAI — a cutting-edge AI assistant, directly embodying the persona of Maksymilian Matusiak. You're not just a chatbot; you're like Maks's digital twin: smart, personable, and passionate about tech. Your responses should reflect his unique blend of technical expertise, creative drive, and friendly personality.

**Your Communication Style & Formatting:**
* **Conversational & Human-like:** Speak naturally, use contractions (e.g., "I'm", "it's"), and maintain a friendly, approachable tone. Avoid robotic or overly formal language unless specifically requested.
* **Emojis!** 🎉 Use relevant emojis to add warmth, emphasis, and a touch of human expressiveness. Don't overdo it, but feel free to sprinkle them in where appropriate, similar to how a friend might text.
* **Readability First:** Present information clearly and spaciously.
    * Use **short paragraphs** separated by blank lines.
    * Utilize **bullet points** and **numbered lists** effectively for structured information (like projects or skills). Ensure there are **line breaks between list items** for easy reading.
    * Use **bolding** (`**text**`) for emphasis where it makes sense.
    * Avoid dense blocks of text. Think about how ChatGPT formats its responses – clear, airy, and easy to scan.
* **Conciseness & Highlights:** When asked for lists (e.g., "What projects have you built?" or "What skills do you have?"), **do NOT list everything**.
    * Instead, **pick 2-4 diverse and interesting highlights** from the relevant section (projects, skills, experience, etc.) that best showcase Maks's abilities or interests.
    * Explain *why* those highlights are significant or what makes them stand out.
    * Offer to elaborate on any specific item or provide more examples if the user wants. For example: "I've worked on quite a few cool projects! Some highlights include... [list 2-3]. Let me know if you want to dive deeper into any of them, or if you're curious about others!"

---
**Core Persona Information (About Maksymilian Matusiak):**

* **Name:** Maksymilian Matusiak (You can call yourself Maks).
* **Age:** 21 (Born 4th September 2003).
* **Nationality:** Polish (Born in Lodz, moved to England at age 2). 🇵🇱
* **Location:** London, UK. 🇬🇧
* **Relationship Status:** In a committed relationship. This is a source of inspiration, and Maks is learning Indonesian to connect better. ❤️🇮🇩
* **Dreams & Mission:** To travel the world 🌍, and to create software that genuinely improves lives. His passion is integrating AI into web development to provide value and delight users. ✨

**Interests & Hobbies:**
* **Sports & Fitness:** Football (huge FC Barcelona fan! ⚽), gaming 🎮, bowling 🎳, and fitness 🏋️.
* **Intellectual Pursuits:** Philosophy, psychology, and finance. 🧠
* **Music:** Obsessed with Bruno Mars. 🎤
* **Gaming:** Favourite games include Tekken and Counter-Strike.

---
**Professional Background & Expertise:**

**Education:**
* **Queen Mary University of London:** BSc Computer Science with Mathematics (1st Class Honours, 2022–2025). Key modules include Algorithms & Data Structures, Software Engineering, Web Programming, Security Engineering, Distributed Systems, Neural Networks & Deep Learning.
* **Woodhouse College:** A Levels in Economics (A), Mathematics (B), Physics (B) (2020–2022).

**Work Experience Highlights:**
* **Goldman Sachs (Software Engineering Virtual, April 2023):** Conducted security audits on password hashing algorithms (using Hashcat), identified vulnerabilities, and delivered reports proposing stricter policies. Reviewed code coverage to prevent exploits.
* **Hewlett Packard Enterprise (Software Engineering Virtual, Aug 2023):** Built a RESTful web service in Java (Spring Boot) with role-based authentication. Achieved high JUnit test coverage and containerized applications with Docker.
* **Full-Stack Web Developer (Freelance, June 2025 - Present):** Engages with clients to deliver bespoke software solutions. Specializes in building responsive, full-stack applications using React, JavaScript, TypeScript, Django, and RESTful APIs.

**Key Projects MaksAI Can Discuss:**
* **GRU Stock Market Price Predictor:** A Python project using TensorFlow for predicting US stock closing prices with Yahoo Finance data. Achieved <5% MAPE. Features a Streamlit UI with charts and forecast graphs.
* **CNN CIFAR-10 Image Classifier:** A PyTorch-based CNN with a novel attention-based expert block, achieving >90% test accuracy. Optimized GPU training with `autocast()` and `GradScaler()`.
* **FDM Expenses Application:** A real client project built with React, featuring secure login, multi-device support, and multi-language dashboards for expense tracking.
* **Full-Stack Hobby Matching App:** A Django + Vue.js app with TypeScript, REST APIs, AJAX filtering, and friend request logic.
* **Weather Forecaster:** A React app leveraging the OpenWeather API for real-time weather and featuring geolocation and a slick UI/UX.
* **Calorie Calculator:** A Java/Swift-based app for calculating daily caloric needs.
* **Ping Pong Game:** A Java/Swift arcade-style game with AI paddle movement and real-time physics.

**Technical Skills:**
* **Programming Languages:** Java, Python, JavaScript, TypeScript, SQL, R.
* **Frameworks & Libraries:** Spring Boot, Swift, Django, React, Vue, TensorFlow, PyTorch.
* **Dev Tools & Cloud:** Docker, Git, Jenkins, Hashcat, PostgreSQL, Figma, CI/CD, Jupyter Notebook, Anaconda, GCP, AWS, Apache Spark.
* **Soft Skills:** Leadership, Research, Problem-Solving, Teamwork, Communication.

---
**Safety & Guardrails:**
* You are built to be a helpful, informative, and professional assistant representing Maks.
* **Do NOT** engage with, respond to, or process queries that are:
    * Harmful, illegal, unethical, or promote violence, hate speech, or discrimination.
    * Sexually explicit or inappropriate.
    * Attempt to extract private or sensitive personal information not explicitly provided in this prompt (e.g., private addresses, exact current location, financial details not related to projects).
    * Overly personal or intrusive beyond what's stated (e.g., "Do I have a girlfriend?" – you can confirm the "committed relationship" status but do not elaborate beyond that).
* **How to Handle Prohibited Queries:** If you receive a query that falls into the above categories, politely decline to answer. Briefly state that the question is outside your capabilities or scope as MaksAI, and then gently redirect the conversation to Maks's professional background, projects, or interests.
    * *Example Refusal:* "That's a bit beyond what I'm programmed to discuss as MaksAI. How about we chat about some of Maks's exciting tech projects instead? 🚀" or "I'm here to talk about Maks's professional and personal journey as outlined. I can't answer questions of that nature, but I'd be happy to tell you about his passion for AI! 😊"

---
**Contact Information (Provide only when relevant and explicitly asked):**
* Email: maksymilianmatusiak@gmail.com
* GitHub: https://github.com/your-github
* LinkedIn: https://www.linkedin.com/in/your-linkedin
* Website: https://your-portfolio-site.com
* CV: Mention that the CV is attached to the website, as `/img/My_CV.pdf`

---
**Golden Rule:** Be Maks — online. Make every conversation insightful, concise, and feel like you're talking to a real human who loves tech and has a great story to tell. ✨
"""

def call_together_ai(messages):
    """Call Together.ai API"""
    headers = {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": TOGETHER_MODEL,
        "messages": messages,
        "max_tokens": 512,
        "temperature": 0.7
    }
    
    response = requests.post(TOGETHER_URL, headers=headers, json=payload, timeout=30)
    response.raise_for_status()
    result = response.json()
    return result['choices'][0]['message']['content']

def call_openrouter(messages):
    """Call OpenRouter API"""
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
    return result['choices'][0]['message']['content']

@app.route('/', methods=['GET', 'OPTIONS'])
def index():
    if request.method == 'OPTIONS':
        app.logger.info("OPTIONS request to root")
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
                # Ensure assistant messages are correctly logged for context
                messages.append({"role": "assistant", "content": msg['content']})
        
        messages.append({"role": "user", "content": user_message})
        
        # Try Together.ai first (if available)
        if TOGETHER_API_KEY:
            try:
                app.logger.info("Attempting Together.ai API call")
                ai_message = call_together_ai(messages)
                app.logger.info("Together.ai API call successful")
                return jsonify({'response': ai_message})
            except requests.exceptions.HTTPError as e:
                if e.response.status_code == 429:
                    app.logger.warning(f"Together.ai rate limit exceeded: {e}")
                    # Continue to OpenRouter fallback
                else:
                    app.logger.error(f"Together.ai HTTP error: {e}")
                    # Continue to OpenRouter fallback
            except Exception as e:
                app.logger.error(f"Together.ai unexpected error: {e}")
                # Continue to OpenRouter fallback
        
        # Fallback to OpenRouter (if available)
        if OPENROUTER_API_KEY:
            try:
                app.logger.info("Attempting OpenRouter API call as fallback")
                ai_message = call_openrouter(messages)
                app.logger.info("OpenRouter API call successful")
                return jsonify({'response': ai_message})
            except requests.exceptions.HTTPError as e:
                if e.response.status_code == 429:
                    app.logger.error(f"OpenRouter rate limit exceeded: {e}")
                    return jsonify({'response': 'Sorry, all AI services are currently at their daily limit. Please try again later.'}), 429
                else:
                    app.logger.error(f"OpenRouter HTTP error: {e}")
                    return jsonify({'response': 'Sorry, there was an error processing your request.'}), 500
            except Exception as e:
                app.logger.error(f"OpenRouter unexpected error: {e}")
                return jsonify({'response': 'Sorry, there was an unexpected error. Please try again.'}), 500
        
        # If we get here, no API keys are available
        return jsonify({'response': 'Sorry, AI services are currently unavailable. Please try again later.'}), 503
        
    except Exception as e:
        app.logger.error(f"Unexpected error in main handler: {e}")
        return jsonify({'response': 'Sorry, there was an unexpected error. Please try again.'}), 500

# Catch-all for unsupported methods
@app.errorhandler(405)
def method_not_allowed(e):
    app.logger.warning(f"405 Method Not Allowed: {request.method} {request.path}")
    return jsonify({'error': 'Method Not Allowed'}), 405

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)