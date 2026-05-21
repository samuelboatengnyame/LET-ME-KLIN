import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, Award, Zap } from 'lucide-react';
import { ChatMessage } from '../types';

export default function ChatbotPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hello! I'm KlynBot, your LetMeKlyn AI scheduling expert. Ask me about our deep, eco-friendly packages, estimated quotes, or our 100% money-back satisfaction guarantee! How can I help you today?",
      timestamp: new Date()
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const suggestionChips = [
    "What's in the deep clean checklist?",
    "Tell me about eco detergents",
    "How does the guarantee work?",
    "What are weekly plan rates?"
  ];

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });

      if (!response.ok) {
        throw new Error('Chat API returned an error.');
      }

      const data = await response.json();
      
      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: data.text || "I apologize, something went wrong. Let me assist you through other means or contact us directly!",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (e: any) {
      console.error(e);
      // Friendly fallback
      const errorMsg: ChatMessage = {
        id: 'error-' + Date.now(),
        sender: 'bot',
        text: "I am having trouble connecting to my central scheduling server, but I can still tell you that regular Home cleaning starts at $110, Deep clean starts at $190, and all our bookings include professional, certified eco-friendly teams! Try using our online booking tab or pricing calculator.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="chatbot-station">
      
      {/* Floating Toggle Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          id="chatbot-bubble-toggle"
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none"
          title="Speak with LetMeKlyn AI"
        >
          <MessageSquare className="h-6 w-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-400"></span>
          </span>
        </button>
      )}

      {/* Main Chatbot Board Panel */}
      {isOpen && (
        <div 
          className="w-[340px] sm:w-[380px] h-[500px] bg-white rounded-3xl border border-slate-200/80 shadow-2xl flex flex-col overflow-hidden dark:bg-slate-900 dark:border-slate-800 transition-all duration-300"
          id="chatbot-board"
        >
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white shadow-inner">
                <Sparkles className="h-5 w-5 text-amber-305" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-black leading-tight">KlynBot scheduling AI</h4>
                <p className="text-[10px] text-blue-200 flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-400 mr-1.5 animate-pulse" />
                  Eco Expert Online
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages loop area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/20">
            {messages.map((msg) => {
              const IsBot = msg.sender === 'bot';
              return (
                <div 
                  key={msg.id} 
                  className={`flex ${IsBot ? 'justify-start' : 'justify-end'} items-start space-x-2`}
                >
                  {IsBot && (
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-extrabold text-[10px] dark:bg-blue-950 dark:text-blue-300">
                      KB
                    </div>
                  )}
                  <div 
                    className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-xs text-left leading-relaxed shadow-sm ${
                      IsBot 
                        ? 'bg-white text-slate-800 dark:bg-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100' 
                        : 'bg-blue-600 text-white rounded-tr-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start items-center space-x-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
                <div className="bg-white text-slate-400 text-xs px-3 py-1.5 rounded-lg italic dark:bg-slate-800">
                  AI is scheduling...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2 border-t border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="inline-block px-3 py-1 text-[10px] font-bold text-blue-600 bg-blue-50/55 rounded-full hover:bg-blue-100 cursor-pointer dark:bg-blue-950/40 dark:text-blue-350 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Form Input footer */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }}
            className="p-3 border-t border-slate-100 bg-white flex gap-2 dark:bg-slate-900 dark:border-slate-800"
          >
            <input
              type="text"
              placeholder="Ask about pricing, slots, checklist..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="w-full rounded-xl border border-slate-200 py-2 px-3 text-xs outline-none bg-slate-50/50 focus:bg-white focus:border-blue-500 dark:border-slate-850 dark:bg-slate-950 dark:text-white"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-xl bg-blue-600 text-white hover:bg-blue-700 p-2 px-3.5 flex items-center justify-center text-xs font-bold disabled:opacity-45"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
