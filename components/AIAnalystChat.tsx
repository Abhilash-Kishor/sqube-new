
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Minimize2, Sparkles, FileText, Download, User, BrainCircuit } from 'lucide-react';
import { startNationalChat } from '../services/geminiService';
import { dashboardData } from '../mockData';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AIAnalystChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Greetings, Executive. I am the S³ National AI Advisor. I have synchronized the latest OASIS National Repository data. How may I assist your policy formulation today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatInstanceRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  const initChat = async () => {
    if (!chatInstanceRef.current) {
      chatInstanceRef.current = await startNationalChat(dashboardData);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      await initChat();
      const response = await chatInstanceRef.current.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, { role: 'model', text: response.text || 'Synthesis failed. Please rephrase.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Connection link severed. Check connectivity.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateReport = () => {
    // Minimize the chat UI before printing to ensure no overlay artifacts
    setIsMinimized(true);
    
    // Slight delay to allow React to update the DOM before system print dialog
    setTimeout(() => {
      window.print();
    }, 500);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="floating-chat-btn fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-20 h-20 bg-[#002B5B] text-white rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,43,91,0.5)] flex items-center justify-center hover:scale-110 transition-all z-[200] group animate-in slide-in-from-bottom-10 no-print"
      >
        <div className="absolute -top-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white animate-pulse"></div>
        <Bot size={32} className="group-hover:rotate-12 transition-transform" />
      </button>
    );
  }

  return (
    <div className={`chat-window fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-[calc(100vw-3rem)] max-w-[480px] bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] z-[300] flex flex-col overflow-hidden border border-slate-100 transition-all duration-300 no-print ${isMinimized ? 'h-20' : 'h-[min(700px,85vh)]'}`}>
      {/* Header */}
      <div className="p-6 bg-[#002B5B] text-white flex items-center justify-between shrink-0 cursor-pointer" onClick={() => isMinimized && setIsMinimized(false)}>
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
              <Bot size={20} className="text-blue-200" />
           </div>
           <div className="min-w-0">
              <h4 className="text-[11px] font-black uppercase tracking-widest leading-none truncate">AI National Analyst</h4>
              <p className="text-[9px] font-bold text-blue-300 mt-1 opacity-70 truncate">S³ Intelligence Online</p>
           </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
           <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><Minimize2 size={16} /></button>
           <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="p-2 hover:bg-white/10 rounded-lg transition-colors"><X size={16} /></button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30 custom-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                <div className={`max-w-[90%] p-5 rounded-3xl text-sm font-medium leading-relaxed shadow-sm flex gap-4 ${msg.role === 'user' ? 'bg-[#002B5B] text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}`}>
                   <div className="shrink-0 mt-1">
                      {msg.role === 'user' ? <User size={16} /> : <BrainCircuit size={16} className="text-blue-600" />}
                   </div>
                   <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex gap-3 items-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce delay-150"></div>
                 </div>
              </div>
            )}
          </div>

          {/* Controls Area */}
          <div className="p-6 bg-white border-t border-slate-100 space-y-4 shrink-0">
             <button 
                onClick={generateReport} 
                className="w-full py-3.5 bg-blue-50 border border-blue-100 rounded-2xl text-[10px] font-black text-[#002B5B] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-100 transition-all active:scale-95 shadow-sm"
              >
                 <Download size={14} /> Generate Executive PDF
              </button>
             
             <div className="relative group">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Query National Registry..."
                  className="w-full pl-6 pr-14 py-4 bg-slate-100 border-2 border-transparent rounded-2xl text-sm font-bold text-slate-700 outline-none focus:bg-white focus:border-blue-500/20 transition-all shadow-inner"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#002B5B] text-white rounded-xl flex items-center justify-center hover:scale-105 transition-all shadow-lg disabled:opacity-50 disabled:scale-100"
                >
                  <Send size={18} />
                </button>
             </div>
             <p className="text-[8px] text-center text-slate-400 font-bold uppercase tracking-[0.3em]">S³ National Hub • Sovereign Data Infrastructure</p>
          </div>
        </>
      )}
    </div>
  );
};

export default AIAnalystChat;
