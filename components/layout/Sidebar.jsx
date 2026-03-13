
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import {
    LayoutDashboard,
    MessageSquare,
    AlertCircle,
    GraduationCap,
    LogOut,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const getMenuItems = () => {
        const role = user?.role || 'student';

        const items = [
            { name: 'Home', icon: LayoutDashboard, href: `/${role}` },
        ];

        if (role === 'student') {
            items.push(
                { name: 'Assistant', icon: MessageSquare, href: '/student/chatbot' },
                { name: 'Support', icon: AlertCircle, href: '/student/complaints' },
                { name: 'Academic', icon: GraduationCap, href: '/student/marks' },
            );
        } else if (role === 'mentor') {
            items.push(
                { name: 'Students', icon: GraduationCap, href: '/mentor/students' },
                { name: 'Issues', icon: AlertCircle, href: '/mentor/complaints' },
            );
        } else if (role === 'admin') {
            items.push(
                { name: 'All Issues', icon: AlertCircle, href: '/admin/complaints' },
                { name: 'User Management', icon: GraduationCap, href: '/admin/users' },
            );
        }

        return items;
    };

    const menuItems = getMenuItems();

    return (
        <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col h-screen sticky top-0 transition-all duration-300">
            <div className="p-6">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded bg-indigo-600 flex items-center justify-center shadow-sm">
                        <GraduationCap className="text-white w-4 h-4" />
                    </div>
                    <span className="text-[15px] font-semibold text-slate-900 tracking-tight">CampusHub</span>
                </div>
            </div>

            <div className="px-3 mb-4">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
                    Navigation
                </div>
                <nav className="space-y-0.5">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-all group",
                                    isActive
                                        ? "bg-slate-200/60 text-slate-900"
                                        : "text-slate-500 hover:bg-slate-200/40 hover:text-slate-900"
                                )}
                            >
                                <item.icon className={cn("w-4 h-4", isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600")} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-4 border-t border-slate-200">
                <button
                    onClick={logout}
                    className="flex items-center gap-2.5 px-3 py-2 w-full rounded-md text-[13px] font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all"
                >
                    <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
