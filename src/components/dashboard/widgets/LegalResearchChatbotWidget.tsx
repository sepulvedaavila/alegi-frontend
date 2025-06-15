
import { useState } from 'react';
import { Send, User, Bot, BookOpen, Search, Link } from 'lucide-react';

// Mock conversation history
const initialConversation = [
  { 
    role: 'bot',
    message: 'Hello! I\'m your AI legal assistant. I can help with legal research and answer questions about your case.'
  }
];

// Mock research results
const mockResearchResults = [
  {
    title: "Thompson v. Allied Corp (2019)",
    relevance: "92%",
    snippet: "The court ruled that the standard of care for healthcare providers includes proper documentation of patient consent."
  },
  {
    title: "Medical Malpractice Statute §402.1",
    relevance: "87%",
    snippet: "A healthcare provider must disclose all material risks prior to treatment..."
  },
  {
    title: "Roberts v. City Hospital (2020)",
    relevance: "79%",
    snippet: "Expert testimony established that the defendant failed to follow standard protocols..."
  }
];

const LegalResearchChatbotWidget = () => {
  const [messages, setMessages] = useState(initialConversation);
  const [inputText, setInputText] = useState('');
  const [showResearch, setShowResearch] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'research'>('chat');
  
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
      
      // Sometimes show research results
      if (Math.random() > 0.5) {
        setShowResearch(true);
      }
    }, 1000);
    
    setInputText('');
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="mb-3 flex border-b pb-2">
        <button 
          className={`flex items-center px-3 py-1 text-xs rounded-t-md ${
            activeTab === 'chat' ? 'bg-alegi-blue text-white' : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('chat')}
        >
          <Bot size={14} className="mr-1" />
          Legal Assistant
        </button>
        <button 
          className={`flex items-center px-3 py-1 text-xs rounded-t-md ${
            activeTab === 'research' ? 'bg-alegi-blue text-white' : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('research')}
        >
          <BookOpen size={14} className="mr-1" />
          Research
        </button>
      </div>
      
      {activeTab === 'chat' ? (
        <>
          <div className="flex-1 overflow-y-auto mb-3">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-2 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] px-3 py-2 rounded-lg text-xs ${
                    msg.role === 'user' 
                      ? 'bg-alegi-blue text-white rounded-tr-none' 
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
            
            {showResearch && (
              <div className="mb-2 flex justify-start">
                <div className="max-w-[85%] px-3 py-2 rounded-lg text-xs bg-blue-50 text-gray-800 rounded-tl-none border border-blue-200">
                  <div className="flex items-center mb-1">
                    <BookOpen size={12} className="mr-1 text-blue-600" />
                    <span className="font-medium text-blue-600">Research Results</span>
                  </div>
                  <div className="space-y-2">
                    {mockResearchResults.slice(0, 2).map((result, idx) => (
                      <div key={idx} className="border-b pb-1 last:border-b-0 last:pb-0">
                        <div className="font-medium">{result.title}</div>
                        <div className="text-gray-600">{result.snippet}</div>
                        <div className="flex justify-between mt-1">
                          <span className="text-blue-600">Relevance: {result.relevance}</span>
                          <a href="#" className="text-blue-600 flex items-center">
                            <Link size={10} className="mr-1" />
                            View
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex border rounded-md overflow-hidden">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a legal question or search for precedents..."
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
        </>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="mb-3 flex border rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search case law, statutes, regulations..."
              className="flex-1 p-2 text-xs focus:outline-none"
            />
            <button className="bg-alegi-blue text-white px-3 flex items-center">
              <Search size={14} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <div className="mb-2 text-xs font-medium text-gray-500">TOP RESULTS FOR: "medical malpractice consent"</div>
            
            <div className="space-y-3">
              {mockResearchResults.map((result, idx) => (
                <div key={idx} className="border rounded-md p-3">
                  <div className="flex justify-between">
                    <h5 className="text-sm font-medium text-alegi-blue">{result.title}</h5>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      {result.relevance}
                    </span>
                  </div>
                  <p className="text-xs mt-1">{result.snippet}</p>
                  <div className="flex mt-2 justify-between text-xs">
                    <div className="flex space-x-2">
                      <button className="text-gray-600 hover:text-alegi-blue">Cite</button>
                      <button className="text-gray-600 hover:text-alegi-blue">Save</button>
                      <button className="text-gray-600 hover:text-alegi-blue">Share</button>
                    </div>
                    <a href="#" className="text-alegi-blue hover:underline">View Full Text</a>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <h5 className="text-xs font-medium mb-2">SEARCH FILTERS</h5>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-500">Jurisdiction</label>
                  <select className="w-full text-xs border rounded p-1 mt-1">
                    <option>Federal</option>
                    <option>State</option>
                    <option>All</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Date Range</label>
                  <select className="w-full text-xs border rounded p-1 mt-1">
                    <option>Last 5 years</option>
                    <option>Last 10 years</option>
                    <option>All time</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalResearchChatbotWidget;
