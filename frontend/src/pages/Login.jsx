import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import loginImg from '../assets/image.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-5xl w-full flex glass rounded-[3rem] shadow-2xl shadow-blue-900/10 border border-white/50 relative z-10 animate-fade-in overflow-hidden">
                {/* Left Side: Image */}
                <div className="hidden lg:block w-1/2 relative bg-gray-900 overflow-hidden">
                    <img
                        src={loginImg}
                        alt="Creative Workspace"
                        className="absolute inset-0 w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent flex flex-col justify-end p-12">
                        <h3 className="text-3xl font-black text-white leading-tight">Master your workflow <br /> with TaskFlow.</h3>
                        <p className="text-gray-300 mt-4 font-medium">Join teams globally using our platform to ship faster and stay organized.</p>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                    <div className="text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
                            <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-200">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-black text-blue-600">TaskFlow</h1>
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 mt-6">Welcome Back</h2>
                        <p className="text-sm text-gray-400 mt-2 font-bold uppercase tracking-widest">Sign in to your account</p>
                    </div>

                    <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="text-red-600 text-sm font-medium text-center bg-red-50 p-4 rounded-xl border border-red-100 animate-pulse">
                                {error}
                            </div>
                        )}
                        <div className="space-y-5">
                            <div>
                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email Address</label>
                                <input
                                    type="email" required
                                    className="appearance-none rounded-2xl relative block w-full px-5 py-4 border border-gray-200 placeholder-gray-300 text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all sm:text-sm bg-gray-50/50 focus:bg-white font-medium"
                                    placeholder="name@company.com"
                                    value={email} onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
                                <input
                                    type="password" required
                                    className="appearance-none rounded-2xl relative block w-full px-5 py-4 border border-gray-200 placeholder-gray-300 text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all sm:text-sm bg-gray-50/50 focus:bg-white font-medium"
                                    placeholder="••••••••"
                                    value={password} onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-black uppercase tracking-[0.2em] rounded-2xl text-white bg-gray-900 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-xl shadow-gray-200 hover:shadow-blue-200">
                                Sign In
                            </button>
                        </div>
                        <div className="text-center text-xs font-bold text-gray-500">
                            New here? <Link to="/register" className="text-blue-600 hover:text-blue-500 font-black transition-colors underline decoration-blue-200 underline-offset-4">Create an account</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
