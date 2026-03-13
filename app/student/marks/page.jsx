'use client';
import MarksTable from '@/components/dashboard/MarksTable';
import { motion } from 'framer-motion';

export default function StudentMarksPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto py-8 space-y-8"
        >
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Academic Records</h1>
                <p className="text-[14px] text-slate-500">View your grades, credits, and overall academic performance for the current semester.</p>
            </div>
            <MarksTable />
        </motion.div>
    );
}
