import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/chasin.svg';
import { fetchRegister } from '../lib/auth';
import { fetchProfile } from '../lib/profile';

export default function Register({ setUser, setIsLoggedIn }) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const result = await fetchRegister(name, email, password)
            localStorage.setItem('token', result);

            const profile = await fetchProfile()
            setUser({ name: profile.name, icon: profile.picture })
            setIsLoggedIn(true)
            navigate('/dashboard')
        } catch (err) {
            console.error('Registration failed:', err)
            alert(err.message || 'Registration failed')
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">
                <div className="flex flex-col items-center mb-6">
                    <img src={logo} alt="Chasin" className="h-10 w-auto mb-2" />
                    <h1 className="text-2xl font-semibold text-gray-900">Create a Chasin account</h1>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                        required
                    />
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
                        Sign up
                    </button>
                </form>

                <p className="mt-4 text-sm text-gray-600 text-center">
                    Already have an account?{' '}
                    <button
                        onClick={() => navigate('/login')}
                        className="text-purple-600 font-medium hover:underline">
                        Log in
                    </button>
                </p>
            </div>
        </div>
    );
}
