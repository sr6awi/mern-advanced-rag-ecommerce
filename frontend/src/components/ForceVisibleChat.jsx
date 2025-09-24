import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { selectLoggedInUser } from '../features/auth/AuthSlice';

export default function ForceVisibleChat() {
  const theme = useTheme();
  const loggedInUser = useSelector(selectLoggedInUser);

  // For storing/restoring chat per user
  const [storageKey, setStorageKey] = useState(null);
  const [open, setOpen] = useState(false);

  // Core chat message state
  const [messages, setMessages] = useState([{
    id: 1,
    text: "👋 Hi! I'm Your Friend, an AI Assistant. Ask me anything about IntelliMart!",
    isBot: true,
    timestamp: new Date(),
    products: []
  }]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  // Always update storageKey if loggedInUser changes
  useEffect(() => {
    if (loggedInUser?._id) {
      setStorageKey(`ciu_chat_${loggedInUser._id}`);
    } else {
      setStorageKey(null);
    }
  }, [loggedInUser]);

  // On login: Load from localStorage
  useEffect(() => {
    if (loggedInUser?._id) {
      const key = `ciu_chat_${loggedInUser._id}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          setMessages(JSON.parse(stored));
        } catch {
          setMessages([{
            id: 1,
            text: "👋 Hi! I'm Your Friend, an AI Assistant. Ask me anything about IntelliMart!",
            isBot: true,
            timestamp: new Date(),
            products: []
          }]);
        }
      } else {
        setMessages([{
          id: 1,
          text: "👋 Hi! I'm Your Friend, an AI Assistant. Ask me anything about IntelliMart!",
          isBot: true,
          timestamp: new Date(),
          products: []
        }]);
      }
    }
  }, [loggedInUser]);

  // On logout: remove history for previous user
  useEffect(() => {
    if (!loggedInUser && storageKey) {
      localStorage.removeItem(storageKey);
      setMessages([{
        id: 1,
        text: "👋 Hi! I'm Your Friend, an AI Assistant. Ask me anything about IntelliMart!",
        isBot: true,
        timestamp: new Date(),
        products: []
      }]);
    }
    // eslint-disable-next-line
  }, [loggedInUser, storageKey]);

  // Save chat to localStorage whenever messages or storageKey changes
  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [messages, storageKey]);

  // Hide chat if not logged in
  if (!loggedInUser) return null;

  const userName = loggedInUser?.name?.split(' ')[0] || 'Shopper';

  const suggestedQuestions = [
    "Cheapest product in the store?",
    "Cheapest Apple product?",
    "How do I return a product?",
    "Can you help me find a specific item?"
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
      products: []
    };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/ai/chat`,
        {
          message: inputValue,
          user: loggedInUser,
        }
      );
      const botResponse = {
        id: messages.length + 2,
        text: data.reply,
        isBot: true,
        timestamp: new Date(),
        products: data.products || []
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      const botResponse = {
        id: messages.length + 2,
        text: "❌ Assistant unavailable.",
        isBot: true,
        timestamp: new Date(),
        products: []
      };
      setMessages(prev => [...prev, botResponse]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestedQuestion = async (question) => {
    const newMessage = {
      id: messages.length + 1,
      text: question,
      isBot: false,
      timestamp: new Date(),
      products: []
    };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/ai/chat`,
        {
          message: question,
          user: loggedInUser,
        }
      );
      const botResponse = {
        id: messages.length + 2,
        text: data.reply,
        isBot: true,
        timestamp: new Date(),
        products: data.products || []
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {
      const botResponse = {
        id: messages.length + 2,
        text: "❌ Assistant unavailable.",
        isBot: true,
        timestamp: new Date(),
        products: []
      };
      setMessages(prev => [...prev, botResponse]);
    } finally {
      setLoading(false);
    }
  };

  // Theme-based colors
  const primaryColor = theme.palette.primary.main;
  const primaryContrast = theme.palette.primary.contrastText || 'white';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 99999,
        backgroundColor: primaryColor,
        padding: '10px',
        borderRadius: '9999px',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        color: primaryContrast,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }}
      onClick={() => setOpen(true)}
    >
      💬
      {!open && (
        <div style={{
          position: 'absolute',
          top: '-8px',
          right: '-8px',
          backgroundColor: theme.palette.error.main,
          color: 'white',
          fontSize: '12px',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold'
        }}>
          1
        </div>
      )}
      {open && (
        <div style={{
          position: 'fixed',
          bottom: '100px',
          right: '20px',
          width: '420px', // Wider chat for better display
          height: '480px',
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: '16px',
          padding: '0',
          zIndex: 99999,
          color: theme.palette.text.primary,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: primaryColor,
            color: primaryContrast,
            padding: '16px',
            borderRadius: '16px 16px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}>
                💬
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>
                  Welcome, {userName}!
                </h4>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.9 }}>How can I help you today?</p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '18px',
                padding: '4px 8px',
                borderRadius: '4px'
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '16px',
            overflowY: 'auto',
            backgroundColor: theme.palette.background.default
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  marginBottom: '12px',
                  display: 'flex',
                  justifyContent: message.isBot ? 'flex-start' : 'flex-end'
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    padding: '8px 12px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    backgroundColor: message.isBot ? 'white' : primaryColor,
                    color: message.isBot ? '#374151' : primaryContrast,
                    borderBottomLeftRadius: message.isBot ? '4px' : '12px',
                    borderBottomRightRadius: message.isBot ? '12px' : '4px',
                    boxShadow: message.isBot ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  {message.text}
                  {/* Render product cards if present */}
                  {message.isBot && message.products && message.products.length > 0 && (
                    <div style={{ marginTop: 8 }}>
                      {message.products.map(prod => (
                        <a
                          key={prod._id}
                          href={`/product-details/${prod._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            border: '1px solid #e5e7eb',
                            borderRadius: 10,
                            padding: 10,
                            marginBottom: 10,
                            textDecoration: 'none',
                            background: '#fafbfc'
                          }}
                        >
                          <img
                            src={prod.image}
                            alt={prod.title}
                            style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }}
                          />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, color: '#111' }}>{prod.title}</div>
                            <div style={{ fontSize: 13, color: '#444', margin: '2px 0' }}>{prod.description}</div>
                            <div style={{ fontSize: 12, color: '#888' }}>
                              {prod.brand} &middot; {prod.category}
                            </div>
                            <div style={{ fontWeight: 700, color: '#0070f3' }}>{prod.price} USD</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ textAlign: 'center', color: '#999', fontSize: '12px', marginTop: '10px' }}>
                <span>AI is thinking...</span>
              </div>
            )}

            {/* Suggested Questions */}
            {messages.length === 1 && !loading && (
              <div style={{ marginTop: '16px' }}>
                <p style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  margin: '0 0 8px 0'
                }}>
                  Quick questions:
                </p>
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px',
                      fontSize: '13px',
                      color: primaryColor,
                      border: `1px solid ${primaryColor}33`,
                      borderRadius: '8px',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      marginBottom: '6px'
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input Area */}
          <div style={{
            padding: '16px',
            borderTop: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
            borderRadius: '0 0 16px 16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                disabled={loading}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '20px',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !inputValue.trim()}
                style={{
                  backgroundColor: primaryColor,
                  color: primaryContrast,
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: loading || !inputValue.trim() ? 'not-allowed' : 'pointer',
                  fontSize: '16px'
                }}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
