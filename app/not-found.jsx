
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
            <div className="text-center space-y-6">
                <h1 className="text-9xl font-black text-indigo-100">404</h1>
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-slate-900">Page Not Found</h2>
                    <p className="text-slate-500 max-w-md mx-auto">
                        The page you are looking for might have been removed or is temporarily unavailable.
                    </p>
                </div>
                <Button render={<Link href="/login" />} className="bg-indigo-600 hover:bg-indigo-700 shadow-lg">
                    <Home className="w-4 h-4 mr-2" /> Back to Safety
                </Button>
            </div>
        </div>
    );
}
