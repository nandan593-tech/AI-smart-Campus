
'use client';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiService } from '@/services/api';
import { GraduationCap, AlertTriangle, CheckCircle } from 'lucide-react';

export default function MarksTable() {
    const [marks, setMarks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMarks = async () => {
            try {
                const data = await apiService.getStudentMarks();
                setMarks(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMarks();
    }, []);

    return (
        <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/30 border-b py-3 px-6">
                <div className="flex flex-row items-center justify-between">
                    <CardTitle className="text-[13px] font-bold text-slate-900 flex items-center gap-2">
                        Academic Performance
                    </CardTitle>
                    <Badge variant="outline" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-slate-200">Sem 4</Badge>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader className="bg-slate-50/10">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-6 h-10">Subject</TableHead>
                            <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-widest h-10">Grade</TableHead>
                            <TableHead className="text-[11px] font-bold text-slate-400 uppercase tracking-widest h-10">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            [...Array(5)].map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell className="px-6 py-4 animate-pulse bg-slate-50 h-10" />
                                    <TableCell className="animate-pulse bg-slate-50 h-10" />
                                    <TableCell className="animate-pulse bg-slate-50 h-10" />
                                </TableRow>
                            ))
                        ) : (
                            marks.map((row) => (
                                <TableRow
                                    key={row.subject}
                                    className="hover:bg-slate-50/50 transition-colors border-slate-100"
                                >
                                    <TableCell className="px-6 py-3 font-medium text-slate-700 text-[13px]">{row.subject}</TableCell>
                                    <TableCell className={`text-[13px] ${row.marks < 40 ? "text-red-500 font-bold" : "text-slate-600 font-medium"}`}>
                                        {row.marks}
                                    </TableCell>
                                    <TableCell>
                                        {row.marks < 40 ? (
                                            <div className="flex items-center gap-1.5 text-red-500 font-bold text-[10px] uppercase tracking-wider">
                                                <AlertTriangle className="w-3 h-3" />
                                                At Risk
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-[10px] uppercase tracking-wider">
                                                <CheckCircle className="w-3 h-3" />
                                                Excellent
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
