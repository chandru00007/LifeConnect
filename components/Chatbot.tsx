import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Spinner } from './common/ui';
import { SparklesIcon, UserIcon } from '../constants';
import { askLifeBot } from '../services/geminiService';
import { LanguageKey } from '../translations';

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  lang: LanguageKey;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, lang }) => {
  const initialMessages: { [key in LanguageKey]: string } = {
    EN: "Namaste! I'm LifeBot. How can I help you with your questions about organ donation in India?",
    HI: "नमस्ते! मैं लाइफबॉट हूं। मैं भारत में अंग दान के बारे में आपके प्रश्नों में कैसे मदद कर सकता हूं?",
    KN: "ನಮಸ್ಕಾರ! ನಾನು ಲೈಫ್‌ಬಾಟ್. ಭಾರತದಲ್ಲಿ ಅಂಗಾಂಗ ದಾನದ ಕುರಿತು ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳಿಗೆ ನಾನು ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?",
  };

  const [messages, setMessages] = useState<Message[]>([
    { text: initialMessages[lang], isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    setMessages([{ text: initialMessages[lang], isUser: false }]);
  }, [lang]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;
    const userMessage: Message = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await askLifeBot(input);
      const botMessage: Message = { text: botResponse, isUser: false };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = { text: "Sorry, I'm having trouble connecting. Please try again.", isUser: false };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };
  
  if(!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 w-full max-w-sm">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl flex flex-col h-[60vh] border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700"><div className="flex items-center gap-2"><SparklesIcon className="w-6 h-6 text-primary" /><h3 className="text-lg font-bold text-secondary dark:text-light">LifeBot Assistant</h3></div><button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.isUser ? 'justify-end' : ''}`}>
                        {!msg.isUser && <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0"><SparklesIcon className="w-5 h-5 text-primary" /></div>}
                        <div className={`max-w-xs px-4 py-2 rounded-xl ${msg.isUser ? 'bg-secondary text-white rounded-br-none' : 'bg-slate-100 dark:bg-slate-700 text-secondary dark:text-light rounded-bl-none'}`}><p className="text-sm whitespace-pre-wrap">{msg.text}</p></div>
                         {msg.isUser && <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center shrink-0"><UserIcon className="w-5 h-5 text-slate-500" /></div>}
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0"><SparklesIcon className="w-5 h-5 text-primary" /></div>
                        <div className="max-w-xs px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-secondary dark:text-light rounded-bl-none">
                            <div className="flex items-center space-x-2"><div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div><div className="w-2 h-2 bg-primary rounded-full animate-pulse [animation-delay:0.2s]"></div><div className="w-2 h-2 bg-primary rounded-full animate-pulse [animation-delay:0.4s]"></div></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex gap-2"><Input value={input} onChange={e => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder="Ask a question..." disabled={isLoading} className="flex-1"/>
                    <Button onClick={handleSend} disabled={isLoading}>{isLoading ? <Spinner /> : 'Send'}</Button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Chatbot;
