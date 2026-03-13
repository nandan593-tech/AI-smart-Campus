
'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { apiService } from '@/services/api';

export default function Chatbot() {
    const [messages, setMessages] = useState([
        { role: 'bot', text: "Hello! I'm your AI Mental Health assistant. How are you feeling today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('https://bujji13.app.n8n.cloud/webhook-test/a7037ecb-5980-49ec-b5a9-5b223b34e406', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage, timestamp: new Date().toISOString() }),
            });

            if (!response.ok) throw new Error('AI connection failed');

            let botReply = "I'm here to listen and help. Would you like to tell me more?";
            try {
                const data = await response.json();
                botReply = data.text || data.reply || data.output || data.message || JSON.stringify(data) || botReply;

            } catch (e) {
                // Fallback if not JSON
                console.log('Non-JSON response received');
            }

            setMessages(prev => [...prev, { role: 'bot', text: botReply }]);
        } catch (error) {
            console.error('Chat API Error:', error);
            setMessages(prev => [...prev, { role: 'bot', text: "I'm sorry, I'm having trouble connecting to the AI system. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="flex flex-col h-[400px] border-slate-200/60 shadow-sm overflow-hidden bg-white">
            <CardHeader className="border-b bg-slate-50/30 py-3">
                <CardTitle className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-slate-400">
                    <Bot className="w-4 h-4 text-indigo-600" />
                    AI Assistant
                </CardTitle>
            </CardHeader>
            <CardContent
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50"
            >
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-2.5 rounded-lg max-w-[85%] text-[13px] leading-relaxed ${msg.role === 'user'
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-700 border border-slate-200/50'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <Loader2 className="w-3 h-3 animate-spin text-slate-400" />
                            <span className="text-[11px] text-slate-400 font-medium tracking-wide italic">AI Thinking...</span>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="p-3 border-t bg-slate-50/30">
                <form
                    onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                    className="flex w-full gap-2"
                >
                    <Input
                        placeholder="Talk to assistant..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1 h-9 bg-white text-[13px] border-slate-200 focus-visible:ring-indigo-500"
                        disabled={isLoading}
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="h-9 w-9 bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                        disabled={isLoading || !input.trim()}
                    >
                        <Send className="w-3.5 h-3.5" />
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}
