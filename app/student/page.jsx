
'use client';
import { useAuth } from '@/hooks/useAuth';
import Chatbot from '@/components/dashboard/Chatbot';
import ComplaintBox from '@/components/dashboard/ComplaintBox';
import MarksTable from '@/components/dashboard/MarksTable';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Sparkles, Calendar, BookOpen, Clock, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function StudentDashboard() {
    const { user } = useAuth();
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-[1200px] mx-auto space-y-10"
        >
            {/* Welcome Section */}
            <motion.section variants={item} className="relative overflow-hidden p-8 rounded-2xl border border-slate-200 bg-white subtle-grid shadow-sm">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 text-[11px] font-bold uppercase tracking-wider">
                            Student Overview
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Good morning, {user?.name?.split(' ')[0] || 'Student'}.
                        </h1>
                        <p className="text-slate-500 text-[15px] max-w-xl leading-relaxed">
                            Your academic standing is <span className="text-slate-900 font-semibold italic">Excellent</span>. You have 2 upcoming lab submissions this week.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        {[
                            { label: 'Current GPA', value: '3.8', icon: BookOpen },
                            { label: 'Credits Earned', value: '12', icon: Clock },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 min-w-[140px] shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <stat.icon className="w-4 h-4 text-slate-400" />
                                    <ArrowUpRight className="w-3 h-3 text-slate-300" />
                                </div>
                                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column - Academic & Reports */}
                <motion.div variants={item} className="lg:col-span-8 space-y-8">
                    <MarksTable />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="linear-card border-none">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Focus Area</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-[13px] text-slate-600 leading-relaxed">Discrete Mathematics requires more attention. Consider review material or mentor support.</p>
                            </CardContent>
                        </Card>
                        <Card className="linear-card border-none">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Next Deadline</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex justify-between items-center text-[13px]">
                                    <span className="font-semibold text-slate-700">OS Lab Report</span>
                                    <span className="text-red-500 font-medium">Due Today</span>
                                </div>
                                <div className="flex justify-between items-center text-[13px]">
                                    <span className="text-slate-500">DBMS Project</span>
                                    <span className="text-slate-400">Mar 24</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>

                {/* Right Column - Interactions */}
                <motion.div variants={item} className="lg:col-span-4 space-y-8">
                    <Chatbot />
                    <ComplaintBox />
                </motion.div>
            </div>
        </motion.div>
    );
}
