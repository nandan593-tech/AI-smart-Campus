'use client';
import Chatbot from '@/components/dashboard/Chatbot';
import { motion } from 'framer-motion';

export default function ChatbotPage() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto py-8 space-y-8"
        >
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">AI Support</h1>
                <p className="text-[14px] text-slate-500">24/7 AI-powered mental health support and academic assistance.</p>
            </div>
            <div className="h-[600px]">
                <Chatbot />
            </div>
        </motion.div>
    );
}
