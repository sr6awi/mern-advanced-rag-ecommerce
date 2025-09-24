import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function TawkStyleChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! I'm Apollo, an AI Assistant. Ask me anything about tawk.to!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const suggestedQuestions = [
    "What is tawk.to?",
    "Why should I choose tawk.to?",
    "How do I set up an AI Chatbot?",
    "I have a different question"
  ];

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        isBot: false,
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "Thanks for your message! This is a demo chat widget. In a real implementation, this would connect to your chat system.",
          isBot: true,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleSuggestedQuestion = (question) => {
    const newMessage = {
      id: messages.length + 1,
      text: question,
      isBot: false,
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: `Great question about "${question}"! This is a demo response. In a real chat, this would provide helpful information.`,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <div 
        className="fixed bottom-5 right-5 z-50"
        style={{ zIndex: 99999 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
        
        {/* Notification Badge */}
        {!isOpen && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            1
          </div>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="fixed bottom-24 right-5 w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ zIndex: 99998 }}
        >
          {/* Header */}
          <div className="bg-green-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <MessageCircle size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Chat with us</h3>
                <p className="text-xs opacity-90">We're online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 ${message.isBot ? 'flex justify-start' : 'flex justify-end'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
                    message.isBot
                      ? 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                      : 'bg-green-500 text-white rounded-br-md'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="block w-full text-left p-2 text-sm text-green-600 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-green-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}