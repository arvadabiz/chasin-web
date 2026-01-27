import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/chasin.svg';
import { fetchLogin } from '../lib/auth';

export default function Login({ setIsLoggedIn, setUser }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await fetchLogin(email, password)
            localStorage.setItem('token', result);
            setUser(result.user)
            setIsLoggedIn(true)
            navigate('/dashboard')
        } catch (err) {
            console.error('Login failed:', err)
            alert(err.message || 'Login failed')
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">
                <div className="flex flex-col items-center mb-6">
                    <img src={logo} alt="Chasin" className="h-10 w-auto mb-2" />
                    <h1 className="text-2xl font-semibold text-gray-900">Log in to Chasin</h1>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white py-2 rounded-xl font-medium hover:bg-purple-700 transition-colors">
                        Log in
                    </button>
                </form>

                <p className="mt-4 text-sm text-gray-600 text-center">
                    Don’t have an account?{' '}
                    <button
                        onClick={() => navigate('/register')}
                        className="text-purple-600 font-medium hover:underline">
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
}
