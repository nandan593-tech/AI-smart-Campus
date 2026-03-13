
'use client';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, Lock, Mail, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            login(email, password, role);
            toast.success(`Logged in as ${role}`);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-indigo-50/50">
            <Card className="w-full max-w-md shadow-xl border-slate-200/60 backdrop-blur-sm bg-white/95">
                <CardHeader className="space-y-4 pb-8">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg transform transition hover:scale-105 duration-300">
                            <GraduationCap className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <div className="text-center space-y-2">
                        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">AI Campus Support</CardTitle>
                        <CardDescription className="text-slate-500">Enter your credentials to access your dashboard</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email">College Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@college.edu"
                                    className="pl-10 h-11 focus-visible:ring-indigo-500"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    id="password"
                                    type="password"
                                    className="pl-10 h-11 focus-visible:ring-indigo-500"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Login As</Label>
                            <Select value={role} onValueChange={setRole}>
                                <SelectTrigger className="h-11 focus:ring-indigo-500">
                                    <SelectValue placeholder="Select your role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="student">Student</SelectItem>
                                    <SelectItem value="mentor">Mentor</SelectItem>
                                    <SelectItem value="admin">Administrator</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
                            disabled={loading}
                        >
                            {loading ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 pt-2">
                    <div className="text-sm text-center text-slate-500">
                        Forgot your password? <button className="text-indigo-600 hover:underline font-medium">Reset now</button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
