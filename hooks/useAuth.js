
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password, role) => {
        // Mock login
        const userData = { email, role, name: role.charAt(0).toUpperCase() + role.slice(1) + ' User' };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);

        // Redirect based on role
        switch (role) {
            case 'student':
                router.push('/student');
                break;
            case 'mentor':
                router.push('/mentor');
                break;
            case 'admin':
                router.push('/admin');
                break;
            default:
                router.push('/');
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        router.push('/login');
    };

    return { user, loading, login, logout };
};
