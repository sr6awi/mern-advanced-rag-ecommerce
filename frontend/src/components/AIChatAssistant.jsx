import { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const AIChatAssistant = () => {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setChat(prev => [...prev, { role: 'user', content: input }]);
    setLoading(true);

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/ai/chat`, {
        message: input,
      });
      setChat(prev => [...prev, { role: 'assistant', content: data.reply }]);
      setInput('');
    } catch (err) {
      setChat(prev => [...prev, { role: 'assistant', content: '❌ Assistant unavailable.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow-md max-w-xl mx-auto mt-10 bg-white">
      <h2 className="text-xl font-bold mb-4">🤖 Chat with CIU AI Assistant</h2>
      <div className="min-h-[200px] max-h-[300px] overflow-y-auto mb-4 space-y-2">
        {chat.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
            }`}
          >
            <span className="font-semibold">{msg.role === 'user' ? 'You' : 'AI'}:</span>{' '}
            <ReactMarkdown>{msg.content}</ReactMarkdown>
          </div>
        ))}
        {loading && <p className="text-sm text-gray-500">AI is thinking...</p>}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask something like 'suggest a cheap watch'"
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatAssistant;
