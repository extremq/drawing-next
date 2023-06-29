import { useRef, useState } from 'react';
import Layout from './layout'
import { mutate } from 'swr';
import useAdmin from '@/lib/useAdmin';
import ReCAPTCHA from "react-google-recaptcha";
export default function LoginForm() {
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [logging, setLogging] = useState(false);
    const recaptchaRef = useRef(null);

    const onReCAPTCHAChange = async (captchaCode) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!captchaCode) {
            return;
        }

        try {
            setLogging(true);
            // Generate csrf token
            const { csrfToken } = await fetch('/api/csrf').then((res) => res.json());

            // Send the reCAPTCHA and token response to the backend API
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'CSRF-Token': csrfToken,
                },
                body: JSON.stringify({ token, captcha: captchaCode }),
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
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('An unexpected error happened occurred:', error.message);
            setError(error.message || 'An error occurred. Please try again.');
        } finally {
            setToken('');
            setLogging(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate the token
        if (!token) {
            setError('Please enter your token');
            return;
        }
        else {
            setError('');
        }

        // Reset then execute the reCAPTCHA when the form is submitted
        recaptchaRef.current.reset();
        recaptchaRef.current.execute();
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
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    size="invisible"
                    onChange={onReCAPTCHAChange}
                />
                <div className="mb-4">
                    <label htmlFor="token" className="block text-white text-sm font-bold mb-2">
                        Token
                    </label>
                    <input
                        type="password"
                        id="token"
                        className={`w-full px-3 py-2 text-black border-2 rounded-md ${error ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="Enter your token"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        disabled={logging}
                    />
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                </div>
                <div className="mb-4">
                    <button
                        type="submit"
                        className="bg-peri hover:bg-peri-dark disabled:bg-peri-darker text-black font-bold py-2 px-4 rounded"
                        disabled={logging}
                    >
                        { logging ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </Layout>
    );
}
