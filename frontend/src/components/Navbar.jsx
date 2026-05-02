import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-6 z-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="glass shadow-2xl shadow-blue-900/5 rounded-[2rem] border border-white/50 px-8 py-4 flex justify-between items-center transition-all duration-300">
                    {/* Logo & Brand */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                            <div className="relative p-2.5 bg-gray-900 rounded-xl transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <span className="text-2xl font-black text-gray-900 tracking-tighter">TaskFlow</span>
                    </Link>
                    
                    {/* Navigation & User */}
                    <div className="flex items-center space-x-10">
                        {user ? (
                            <>
                                <div className="hidden lg:flex items-center space-x-8">
                                    <Link to="/dashboard" className="text-[11px] font-black text-gray-400 hover:text-blue-600 uppercase tracking-[0.2em] transition-colors flex items-center">
                                        <LayoutDashboard className="h-4 w-4 mr-2 opacity-50" /> Overview
                                    </Link>
                                    <div className="h-4 w-px bg-gray-200"></div>
                                </div>

                                <div className="flex items-center space-x-5">
                                    <div className="flex flex-col items-end mr-1">
                                        <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest">{user.name}</span>
                                        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-tighter px-1.5 py-0.5 bg-blue-50 rounded-md border border-blue-100">{user.role}</span>
                                    </div>
                                    <div className="relative group cursor-pointer">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
                                        <div className="relative h-11 w-11 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-blue-600 font-black text-lg transition-all duration-300 group-hover:rounded-xl">
                                            {user.name.charAt(0)}
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all active:scale-95 border border-transparent hover:border-red-100"
                                        title="Sign Out"
                                    >
                                        <LogOut className="h-5 w-5" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-6">
                                <Link to="/login" className="text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">Sign In</Link>
                                <Link to="/register" className="px-7 py-3.5 bg-gray-900 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-[1.2rem] hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 hover:shadow-blue-200 hover:-translate-y-0.5">Get Started</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
