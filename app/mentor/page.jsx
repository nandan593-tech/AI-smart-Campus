
'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { apiService } from '@/services/api';
import { Users, GraduationCap, AlertTriangle, Search, Filter, Mail, Phone, MoreVertical, LayoutGrid } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function MentorDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const result = await apiService.getMentorDashboardData();
                setData(result);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-[1200px] mx-auto space-y-10"
        >
            <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Academic Mentoring</h1>
                    <p className="text-slate-500 text-[15px]">Monitor student progress and identify individuals requiring additional support.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-9 text-[13px] border-slate-200">
                        <LayoutGrid className="w-3.5 h-3.5 mr-2 text-slate-400" /> View All
                    </Button>
                    <Button className="h-9 text-[13px] bg-slate-900 hover:bg-black shadow-sm">
                        Schedule Review
                    </Button>
                </div>
            </motion.div>

            {/* Analytics Cards */}
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Assigned Students', value: data?.totalStudents || '--', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Low Performance', value: data?.atRiskCount || '--', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
                    { label: 'Alerts Dispatched', value: data?.alertsSent || '--', icon: Mail, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                ].map((stat, i) => (
                    <Card key={i} className="linear-card border-none">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                                </div>
                                <div className={`p-3 ${stat.bg} rounded-xl`}>
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </motion.div>

            {/* Risk Table */}
            <motion.div variants={item}>
                <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                    <CardHeader className="border-b bg-slate-50/20 py-4 px-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <GraduationCap className="w-4 h-4 text-indigo-600" />
                                <CardTitle className="text-[15px] font-bold">Students at Academic Risk</CardTitle>
                            </div>
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                                <Input placeholder="Find student..." className="pl-9 h-8 bg-slate-50/50 border-slate-200 text-[13px]" />
                            </div>
                        </div>
                    </CardHeader>
                    <Table>
                        <TableHeader className="bg-slate-50/10">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-6 h-10">Student</TableHead>
                                <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-widest h-10">Department</TableHead>
                                <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-widest h-10">Performance</TableHead>
                                <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-widest h-10">Action</TableHead>
                                <TableHead className="text-right px-6 h-10"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                [...Array(3)].map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="px-6 py-4 animate-pulse bg-slate-50 h-12" />
                                        <TableCell className="animate-pulse bg-slate-50" />
                                        <TableCell className="animate-pulse bg-slate-50" />
                                        <TableCell className="animate-pulse bg-slate-50" />
                                        <TableCell className="animate-pulse bg-slate-50" />
                                    </TableRow>
                                ))
                            ) : (
                                data?.atRiskStudents?.map((student) => (
                                    <TableRow key={student.id} className="hover:bg-slate-50/40 transition-colors border-slate-100">
                                        <TableCell className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-[13px] font-bold text-slate-900">{student.name}</span>
                                                <span className="text-[11px] text-slate-400">{student.id}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-[13px] text-slate-600">{student.dept}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-red-500" style={{ width: `${student.marks}%` }} />
                                                </div>
                                                <span className="text-[11px] font-bold text-red-500">{student.marks}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm" className="h-7 text-[10px] uppercase font-bold tracking-wider px-3 border-red-200 text-red-600 hover:bg-red-50">
                                                Contact Parent
                                            </Button>
                                        </TableCell>
                                        <TableCell className="text-right px-6">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-slate-600">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </motion.div>
        </motion.div>
    );
}
