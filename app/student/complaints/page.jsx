'use client';
import ComplaintBox from '@/components/dashboard/ComplaintBox';
import { motion } from 'framer-motion';

export default function StudentComplaintsPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl mx-auto py-8 space-y-8"
        >
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Submit Request</h1>
                <p className="text-[14px] text-slate-500">Notice something wrong? Report issues regarding campus facilities or academic concerns.</p>
            </div>
            <ComplaintBox />
        </motion.div>
    );
}
