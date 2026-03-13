
'use client';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Loader2, GraduationCap } from 'lucide-react';

export default function AdminMarksUpload() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        student_name: '',
        student_id: '',
        subject: '',
        marks: '',
        attendance: '',
        mentor_email: '',
        semester: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value) => {
        setFormData(prev => ({ ...prev, semester: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple validation
        if (!formData.student_name || !formData.student_id || !formData.subject || !formData.marks || !formData.attendance || !formData.mentor_email || !formData.semester) {
            toast.error('Please fill in all fields.');
            return;
        }

        setLoading(true);

        try {
            console.log('Attempting to upload marks to:', 'https://bujji13.app.n8n.cloud/webhook-test/99cf61aa-41cd-4909-8b30-0bc21be29173');
            const response = await fetch('https://bujji13.app.n8n.cloud/webhook-test/99cf61aa-41cd-4909-8b30-0bc21be29173', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    marks: Number(formData.marks),
                    attendance: Number(formData.attendance)
                }),
            });

            if (response.ok) {
                toast.success("Student marks uploaded successfully.");
                setFormData({
                    student_name: '',
                    student_id: '',
                    subject: '',
                    marks: '',
                    attendance: '',
                    mentor_email: '',
                    semester: ''
                });
            } else {
                throw new Error('Failed to upload marks');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to upload marks. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
            <CardHeader className="border-b bg-slate-50/20 py-5 px-6">
                <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-indigo-600" />
                    <div className="space-y-0.5">
                        <CardTitle className="text-[15px] font-bold">Upload Student Marks</CardTitle>
                        <CardDescription className="text-[12px]">Enter student academic performance data for risk analysis.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="student_name" className="text-[13px] font-semibold text-slate-700">Student Name</Label>
                            <Input
                                id="student_name"
                                name="student_name"
                                placeholder="John Doe"
                                value={formData.student_name}
                                onChange={handleChange}
                                className="h-10 text-[13px] border-slate-200 bg-slate-50/30 focus-visible:ring-indigo-500/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="student_id" className="text-[13px] font-semibold text-slate-700">Student ID</Label>
                            <Input
                                id="student_id"
                                name="student_id"
                                placeholder="STU12345"
                                value={formData.student_id}
                                onChange={handleChange}
                                className="h-10 text-[13px] border-slate-200 bg-slate-50/30 focus-visible:ring-indigo-500/20"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="subject" className="text-[13px] font-semibold text-slate-700">Subject</Label>
                            <Input
                                id="subject"
                                name="subject"
                                placeholder="Data Structures"
                                value={formData.subject}
                                onChange={handleChange}
                                className="h-10 text-[13px] border-slate-200 bg-slate-50/30 focus-visible:ring-indigo-500/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="marks" className="text-[13px] font-semibold text-slate-700">Marks</Label>
                            <Input
                                id="marks"
                                name="marks"
                                type="number"
                                placeholder="0-100"
                                value={formData.marks}
                                onChange={handleChange}
                                className="h-10 text-[13px] border-slate-200 bg-slate-50/30 focus-visible:ring-indigo-500/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="attendance" className="text-[13px] font-semibold text-slate-700">Attendance (%)</Label>
                            <Input
                                id="attendance"
                                name="attendance"
                                type="number"
                                placeholder="0-100"
                                value={formData.attendance}
                                onChange={handleChange}
                                className="h-10 text-[13px] border-slate-200 bg-slate-50/30 focus-visible:ring-indigo-500/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="semester" className="text-[13px] font-semibold text-slate-700">Semester</Label>
                            <Select value={formData.semester} onValueChange={handleSelectChange}>
                                <SelectTrigger className="h-10 text-[13px] border-slate-200 bg-slate-50/30 w-full">
                                    <SelectValue placeholder="Select Semester" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                        <SelectItem key={sem} value={`Semester ${sem}`}>Semester {sem}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="mentor_email" className="text-[13px] font-semibold text-slate-700">Mentor Email</Label>
                        <Input
                            id="mentor_email"
                            name="mentor_email"
                            type="email"
                            placeholder="mentor@college.edu"
                            value={formData.mentor_email}
                            onChange={handleChange}
                            className="h-10 text-[13px] border-slate-200 bg-slate-50/30 focus-visible:ring-indigo-500/20"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 bg-slate-900 hover:bg-black text-white font-bold text-[14px] shadow-lg transition-all active:scale-[0.98]"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            'Upload Marks'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
