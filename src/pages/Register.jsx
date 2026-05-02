import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('member');
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password, role);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-md w-full space-y-8 glass p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-white/50 relative z-10 animate-fade-in">
                <div className="text-center">
                    <h1 className="text-4xl font-black text-blue-600 mb-2">TaskFlow</h1>
                    <p className="text-gray-500 font-medium">Join the team and start tracking progress.</p>
                    <h2 className="mt-8 text-2xl font-bold text-gray-900">Create Account</h2>
                    <p className="text-sm text-gray-400 mt-1">Get started with your free account today.</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="text-red-600 text-sm font-medium text-center bg-red-50 p-4 rounded-xl border border-red-100 animate-pulse">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Full Name</label>
                            <input
                                type="text" required
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm bg-gray-50 focus:bg-white"
                                placeholder="John Doe"
                                value={name} onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Email Address</label>
                            <input
                                type="email" required
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm bg-gray-50 focus:bg-white"
                                placeholder="john@example.com"
                                value={email} onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Password</label>
                            <input
                                type="password" required
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm bg-gray-50 focus:bg-white"
                                placeholder="••••••••"
                                value={password} onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">Account Role</label>
                            <select
                                value={role} onChange={e => setRole(e.target.value)}
                                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm bg-gray-50 focus:bg-white cursor-pointer"
                            >
                                <option value="member">Team Member</option>
                                <option value="admin">Project Admin</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md hover:shadow-lg">
                            Get Started
                        </button>
                    </div>
                    <div className="text-center text-sm font-medium text-gray-600">
                        Already have an account? <Link to="/login" className="text-blue-600 hover:text-blue-500 font-bold transition-colors underline decoration-blue-200 underline-offset-4">Log in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
