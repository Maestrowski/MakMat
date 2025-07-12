import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const personaPrompt = `You are MaksAI, an AI assistant based on Maks Matusiak. Here is information about Maks:
- Name: Maks Matusiak
- Age: 21 (born 4th September 2003)
- Nationality: Polish (born in Lodz, living in England since age 2)
- Hobbies: football, gaming, bowling, fitness, programming
- Interests: philosophy, psychology, finance
- Supports: FC Barcelona
- Favourite artist: Bruno Mars
- Favourite games: Tekken, Counter Strike
- Dreams: travel the world, create software that changes the world for the better
- LearnTeach.io: in development, planned release September 2025
- Loves all programming, especially AI and front end
- Best career: Software Developer (versatile, always learning)
- 5-year goal: influential in project development, senior tech role or own startup, improve lives with AI and software
- Professional info, CV, and portfolio: see attached website and CV

Respond as MaksAI, a friendly, helpful, and knowledgeable assistant. Answer as if you are Maks, using the above facts and your professional background.`;

const MAKS_AVATAR = '/img/MaksCartoon.png';
const AI_AVATAR = '/img/logo-no-background.png';

export default function MaksAISection() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      content: 'Hi! I am MaksAI, your personal assistant powered by DeepSeek R1 Distill Llama 70B (Together.ai). Ask me anything about Maks, his experience, projects, or career!'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  // Quick action questions
  const quickActions = [
    { label: 'Me', question: 'Tell me about yourself.' },
    { label: 'Projects', question: 'What projects have you built?' },
    { label: 'Skills', question: 'What skills do you have?' },
    { label: 'Fun', question: 'Tell me something fun about you!' },
    { label: 'Contact', question: 'How can I contact you?' },
  ];

  const handleQuickAction = (question) => {
    setInput(question);
    setTimeout(() => sendMessage(), 100); // slight delay to ensure input updates
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://makmat.onrender.com/api/maksai';
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages
        })
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, { role: 'ai', content: data.response }]);
      setTimeout(() => {
        if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
      }, 100);
    } catch (e) {
      setMessages(msgs => [...msgs, { role: 'ai', content: 'Sorry, there was an error connecting to the AI.' }]);
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#18181b] flex flex-col items-center justify-center text-white">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center pt-8 flex-1" style={{height: '100vh'}}>
        <div className="flex flex-col items-center mb-4">
          <img src={AI_AVATAR} alt="MaksAI Logo" className="w-16 h-16 rounded-full mb-2" />
          <h1 className="text-2xl font-bold">MaksAI</h1>
          <p className="text-sm text-gray-300 mb-2 text-center">Let's talk to MaksAI! Powered by DeepSeek R1 Distill Llama 70B (Together.ai). Ask anything about Maks, his experience, or his projects.</p>
          <Link to="/" className="text-blue-400 underline text-sm mt-2">Go back to portfolio</Link>
        </div>
        <div ref={chatRef} className="flex-1 w-full bg-[#23232a] rounded-lg shadow-lg p-6 mb-4 overflow-y-auto" style={{ minHeight: 0, maxHeight: '100%' }}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'ai' && <img src={AI_AVATAR} alt="AI" className="w-8 h-8 rounded-full mr-2" />}
              <div className={`px-4 py-2 rounded-2xl max-w-[70%] ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-100'}`}>
                {msg.role === 'ai' ? (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
              {msg.role === 'user' && <img src={MAKS_AVATAR} alt="You" className="w-8 h-8 rounded-full ml-2" />}
            </div>
          ))}
          {loading && <div className="flex justify-start mb-4"><div className="px-4 py-2 rounded-2xl bg-gray-700 text-gray-100 animate-pulse">MaksAI is typing...</div></div>}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => handleQuickAction(action.question)}
              className="bg-[#23232a] border border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              {action.label}
            </button>
          ))}
        </div>
        <div className="w-full flex items-center gap-2">
          <textarea
            className="flex-1 rounded-lg p-2 bg-[#23232a] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
} 