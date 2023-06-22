import { useState } from 'react';
import Layout from './layout'
import { mutate } from 'swr';
import useAdmin from '@/lib/useAdmin';

export default function LoginForm() {
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            if (response.ok) {
                // Login successful
                setError('');

                // Fetch the new user data and update the SWR cache
                const newUser = await fetch('/api/admin').then(res => res.json());
                mutate('/api/admin', newUser, false);
            } else {
                // Login failed
                const data = await response.json();
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('An unexpected error happened occurred:', error);
            setError('An error occurred. Please try again.');
        }
    };

    useAdmin({
        redirectTo: '/admin',
        redirectIfFound: true,
    });

    return (
        <Layout title={"Login"}>
            <p className="text-lg mb-3">
                Hey, you found the secret login page!
                <br /> <br />
                Don&apos;t tell anyone.
            </p>
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="token" className="block text-white text-sm font-bold mb-2">
                        Token
                    </label>
                    <input
                        type="password"
                        id="token"
                        className={`w-full px-3 py-2 text-black focus:ring focus:ring-blue-500 border rounded-md focus:outline-none ${error ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Enter your token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                    />
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-500"
                    >
                        Log In
                    </button>
                </div>
            </form>
        </Layout>
    );
}
