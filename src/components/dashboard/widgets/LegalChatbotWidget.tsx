
import { useState } from 'react';
import { Send, User, Bot } from 'lucide-react';

// Mock conversation history
const initialConversation = [
  { 
    role: 'bot',
    message: 'Hello! I\'m your AI legal assistant. How can I help with your case today?'
  }
];

const LegalChatbotWidget = () => {
  const [messages, setMessages] = useState(initialConversation);
  const [inputText, setInputText] = useState('');
  
  const handleSend = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    setMessages([...messages, { role: 'user', message: inputText }]);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Based on the case details, I recommend focusing on the precedent set in Thompson v. Allied Corp (2019).",
        "The statute of limitations in this jurisdiction is 2 years from the date of discovery.",
        "Your case has several strong elements, particularly the expert testimony and documented timeline.",
        "I've analyzed similar cases and found a 74% settlement rate with an average of $820,000."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { role: 'bot', message: randomResponse }]);
    }, 1000);
    
    setInputText('');
  };
  
  return (
    <div className="flex flex-col h-32"> {/* Keep h-32 height */}
      <div className="flex-1 overflow-y-auto mb-3 print:h-auto print:max-h-none">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`mb-2 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] px-3 py-2 rounded-lg text-xs ${
                msg.role === 'user' 
                  ? 'bg-alegi-blue text-white rounded-tr-none print:bg-blue-200 print:text-black' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}
            >
              <div className="flex items-center mb-1">
                {msg.role === 'user' 
                  ? <User size={12} className="mr-1" /> 
                  : <Bot size={12} className="mr-1" />
                }
                <span className="font-medium">
                  {msg.role === 'user' ? 'You' : 'Legal AI'}
                </span>
              </div>
              {msg.message}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex border rounded-md overflow-hidden print:hidden">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask a legal question..."
          className="flex-1 p-2 text-xs focus:outline-none"
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button 
          onClick={handleSend}
          className="bg-alegi-blue text-white px-3 flex items-center"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  );
};

export default LegalChatbotWidget;
