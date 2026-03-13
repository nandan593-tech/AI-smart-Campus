
'use client';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import { Toaster } from '@/components/ui/sonner';

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login' || pathname === '/';

    if (isLoginPage) {
        return (
            <main className="min-h-screen bg-slate-50">
                {children}
                <Toaster position="top-right" />
            </main>
        );
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-6 md:p-10 flex-1">
                    {children}
                </main>
            </div>
            <Toaster position="top-right" />
        </div>
    );
}
