
'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { apiService } from '@/services/api';
import { Inbox, CheckCircle, Clock, Filter, Search, MoreVertical, ShieldAlert } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import AdminMarksUpload from '@/components/dashboard/AdminMarksUpload';

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

export default function AdminDashboard() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const data = await apiService.getComplaints();
                setComplaints(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchComplaints();
    }, []);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Resolved':
                return <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[10px] uppercase tracking-wider"><CheckCircle className="w-3 h-3" /> Resolved</div>;
            case 'Pending':
                return <div className="flex items-center gap-1.5 text-amber-600 font-bold text-[10px] uppercase tracking-wider"><Clock className="w-3 h-3" /> Pending</div>;
            case 'In Review':
                return <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-[10px] uppercase tracking-wider"><Search className="w-3 h-3" /> In Review</div>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-[1200px] mx-auto space-y-10"
        >
            <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Administration</h1>
                    <p className="text-slate-500 text-[15px]">Monitor campus issues and system performance across all departments.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-9 text-[13px] border-slate-200">
                        <Filter className="w-3.5 h-3.5 mr-2 text-slate-400" /> Filter
                    </Button>
                    <Button className="h-9 text-[13px] bg-slate-900 hover:bg-black shadow-sm">
                        Export Reports
                    </Button>
                </div>
            </motion.div>

            {/* Analytics Cards */}
            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Complaints', value: '128', icon: Inbox, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                    { label: 'Resolved', value: '94', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Pending', value: '34', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
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

            {/* Marks Upload Section */}
            <motion.div variants={item} className="grid grid-cols-1 gap-6">
                <AdminMarksUpload />
            </motion.div>

            {/* Complaints Table */}
            <motion.div variants={item}>
                <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
                    <CardHeader className="border-b bg-slate-50/20 py-4 px-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4 text-indigo-600" />
                                <CardTitle className="text-[15px] font-bold">Active Issues</CardTitle>
                            </div>
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                                <Input placeholder="Quick search..." className="pl-9 h-8 bg-slate-50/50 border-slate-200 text-[13px]" />
                            </div>
                        </div>
                    </CardHeader>
                    <Table>
                        <TableHeader className="bg-slate-50/10">
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-6 h-10">Type</TableHead>
                                <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-widest h-10">Description</TableHead>
                                <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-widest h-10">Time</TableHead>
                                <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-widest h-10">Status</TableHead>
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
                                complaints.map((complaint) => (
                                    <TableRow key={complaint.id} className="hover:bg-slate-50/40 transition-colors border-slate-100">
                                        <TableCell className="px-6 py-4">
                                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 uppercase tracking-wide">
                                                {complaint.complaintType}
                                            </span>
                                        </TableCell>
                                        <TableCell className="max-w-md">
                                            <p className="text-[13px] font-medium text-slate-700 truncate">{complaint.description}</p>
                                        </TableCell>
                                        <TableCell className="text-[13px] text-slate-400">{complaint.submittedTime}</TableCell>
                                        <TableCell>{getStatusBadge(complaint.status)}</TableCell>
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
