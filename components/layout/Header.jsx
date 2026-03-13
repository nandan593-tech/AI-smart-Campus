'use client';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, User, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { usePathname } from 'next/navigation';

export default function Header() {
    const { user, logout } = useAuth();
    const pathname = usePathname();

    const getPageTitle = () => {
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length === 0) return 'Dashboard';
        return parts[parts.length - 1].charAt(0).toUpperCase() + parts[parts.length - 1].slice(1);
    };

    return (
        <header className="h-14 border-b border-slate-200 bg-white sticky top-0 z-30 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
                <span className="text-[13px] font-medium text-slate-400 capitalize">{user?.role}</span>
                <span className="text-slate-300">/</span>
                <h2 className="text-[13px] font-semibold text-slate-900 tracking-tight">
                    {getPageTitle()}
                </h2>
            </div>

            <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                    <Bell className="w-4 h-4" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger className="h-8 w-8 rounded-full bg-slate-100 p-0 overflow-hidden border border-slate-200 hover:border-slate-300 cursor-pointer focus:outline-none transition-colors">
                        <div className="w-full h-full flex items-center justify-center text-[11px] font-bold text-slate-600 bg-slate-50">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-1 rounded-lg border-slate-200">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="font-normal p-3">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-[13px] font-semibold leading-none text-slate-900">{user?.name || 'User'}</p>
                                    <p className="text-[11px] leading-none text-slate-400">{user?.email}</p>
                                </div>
                            </DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-700 focus:bg-red-50 py-2 cursor-pointer">
                            <LogOut className="mr-2 h-3.5 w-3.5" />
                            <span className="text-[13px]">Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
