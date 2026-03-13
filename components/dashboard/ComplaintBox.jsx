
'use client';
import { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { apiService } from '@/services/api';
import { toast } from 'sonner';

export default function ComplaintBox() {
    const [complaintType, setComplaintType] = useState('');
    const [description, setDescription] = useState('');
    const [studentId, setStudentId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!complaintType || !description) {
            toast.error('Required fields missing');
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('https://bujji13.app.n8n.cloud/webhook-test/1a5cc44f-6060-4eff-9977-8eadedcbf6ea', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    complaintType,
                    description,
                    studentId,
                    timestamp: new Date().toISOString(),
                    role: 'student'
                }),
            });

            if (!response.ok) throw new Error('Submission failed');

            setIsSuccess(true);
            toast.success('Submitted');
            setTimeout(() => {
                setComplaintType('');
                setDescription('');
                setStudentId('');
                setIsSuccess(false);
            }, 3000);
        } catch (error) {
            console.error('Complaint submission error:', error);
            toast.error('Failed to submit issue');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <Card className="h-[300px] flex flex-col items-center justify-center p-8 border-slate-200 bg-slate-50/50 rounded-xl">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-2" />
                <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-wider">Submitted</h3>
                <p className="text-[11px] text-slate-400 mt-1">We'll review your issue shortly.</p>
            </Card>
        );
    }

    return (
        <Card className="border-slate-200 shadow-sm rounded-xl overflow-hidden bg-white">
            <CardHeader className="bg-slate-50/30 border-b py-3">
                <CardTitle className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-indigo-600" />
                    Support Request
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
                <div className="space-y-1.5">
                    <Label htmlFor="type" className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Category</Label>
                    <Select value={complaintType} onValueChange={setComplaintType}>
                        <SelectTrigger id="type" className="h-9 text-[13px] border-slate-200">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Hostel">Hostel</SelectItem>
                            <SelectItem value="Academic">Academic</SelectItem>
                            <SelectItem value="Facilities">Facilities</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="desc" className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">Issue Description</Label>
                    <Textarea
                        id="desc"
                        placeholder="Details..."
                        className="min-h-[80px] text-[13px] border-slate-200 resize-none focus-visible:ring-indigo-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <Button
                    onClick={handleSubmit}
                    className="w-full bg-slate-900 hover:bg-black h-9 text-[13px] font-medium transition-all"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Submit Issue'}
                </Button>
            </CardContent>
        </Card>
    );
}
