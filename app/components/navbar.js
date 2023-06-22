import useAdmin from '@/lib/useAdmin';
import Link from 'next/link';
import { mutate } from 'swr';
import Router from 'next/router';

export default function Navbar() {
    const { auth } = useAdmin({});

    const handleLogout = async () => {
        await fetch('/api/logout', {
            method: 'POST',
        })

        // Fetch the new user data and update the SWR cache
        const newUser = await fetch('/api/admin').then(res => res.json());
        mutate('/api/admin', newUser, false);

        // Redirect to home page
        Router.push('/');
    };

    return (
        <nav className="bg-black py-3 border-b mb-12">
            <div className="max-w-7xl mx-auto  flex justify-between items-center ">
                <div className="flex items-center">
                    <Link className="text-white text-lg font-bold" href="/">
                        extremq&apos;s drawings
                    </Link>
                </div>
                <div className="flex items-center">
                    {auth?.admin && (
                    <Link className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium" href="/admin">
                        Admin Dashboard
                    </Link>
                    )}
                    <Link className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium" href="/">
                        Home
                    </Link>
                    <Link className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium" href="/about">
                        About
                    </Link>
                    {auth?.admin && (
                    <button
                        className="text-white hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
