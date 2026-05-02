import { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Folder, Plus, BarChart3, Clock, CheckCircle, Circle, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [newProject, setNewProject] = useState({ name: '', description: '' });

    const [allUsers, setAllUsers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);

    useEffect(() => {
        fetchData();
        if (user.role === 'admin') fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/auth/users');
            setAllUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchData = async () => {
        try {
            const [projRes, taskRes] = await Promise.all([
                api.get('/projects'),
                api.get('/tasks')
            ]);
            setProjects(projRes.data);
            setTasks(taskRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            await api.post('/projects', { ...newProject, members: selectedMembers });
            setNewProject({ name: '', description: '' });
            setSelectedMembers([]);
            setShowCreate(false);
            fetchData();
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    // Calculate metrics
    const totalProjects = projects.length;
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = tasks.filter(t => t.status === 'pending').length;
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
    const overdueTasks = tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length;
    const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    // Calculate member progress for Admin
    const memberStats = allUsers.map(member => {
        const memberTasks = tasks.filter(t => (t.assignedTo?._id || t.assignedTo) === member._id);
        const completed = memberTasks.filter(t => t.status === 'completed').length;
        const total = memberTasks.length;
        const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
        return { ...member, completed, total, percentage };
    }).filter(m => m.total > 0);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                        {getGreeting()}, {user.name.split(' ')[0]}!
                    </h1>
                    <p className="text-gray-500 font-medium mt-2 flex items-center">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        {user.role === 'admin' 
                            ? 'Your team is active. Here is the latest performance data.' 
                            : 'You have some tasks waiting for your attention today.'}
                    </p>
                </div>
                {user.role === 'admin' && (
                    <button
                        onClick={() => setShowCreate(!showCreate)}
                        className={`flex items-center px-6 py-3 rounded-2xl font-bold transition-all shadow-lg hover:shadow-xl active:scale-95 ${showCreate ? 'bg-gray-100 text-gray-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                        {showCreate ? 'Close Form' : <><Plus className="h-5 w-5 mr-2" /> New Project</>}
                    </button>
                )}
            </div>

            {/* Metrics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
                <MetricCard title="Projects" value={totalProjects} icon={<Folder className="h-6 w-6" />} color="blue" />
                <MetricCard title="Active Tasks" value={totalTasks} icon={<BarChart3 className="h-6 w-6" />} color="blue" />
                <MetricCard title="Completed" value={completedTasks} icon={<CheckCircle className="h-6 w-6" />} color="green" />
                <MetricCard title="In Progress" value={inProgressTasks} icon={<Circle className="h-6 w-6" />} color="yellow" />
                <MetricCard title="Overdue" value={overdueTasks} icon={<Clock className="h-6 w-6" />} color="red" />
                
                <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl shadow-blue-900/5 border border-white/50 p-8 col-span-1 md:col-span-3 lg:col-span-5 flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-500">
                        <BarChart3 className="h-24 w-24 text-blue-600" />
                    </div>
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <span className="text-xs font-black uppercase tracking-widest text-gray-400">Aggregated Progress</span>
                            <h3 className="text-3xl font-black text-gray-900 mt-1">{progressPercentage}% <span className="text-sm text-gray-400 font-medium">Efficiency</span></h3>
                        </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden shadow-inner">
                        <div 
                            className="bg-gradient-to-r from-blue-600 to-indigo-500 h-full rounded-full transition-all duration-1000 ease-out shadow-lg" 
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Team Performance Section (Moved below Metrics) */}
            {user.role === 'admin' && memberStats.length > 0 && (
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-black text-gray-900">Team Performance</h2>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{memberStats.length} active contributors</span>
                    </div>
                    <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-thin scrollbar-thumb-gray-200">
                        {memberStats.map(stat => (
                            <div key={stat._id} className="min-w-[280px] bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm flex flex-col hover:border-indigo-200 transition-all duration-300">
                                <div className="flex items-center mb-4">
                                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-sm mr-3">
                                        {stat.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 leading-tight">{stat.name}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{stat.role}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-xs font-bold text-gray-500">Tasks: {stat.completed}/{stat.total}</span>
                                    <span className="text-xs font-black text-indigo-600">{stat.percentage}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${stat.percentage}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Create Project Form */}
            {showCreate && user.role === 'admin' && (
                <form onSubmit={handleCreateProject} className="glass p-10 rounded-3xl shadow-2xl border border-white/50 mb-12 animate-in fade-in slide-in-from-top-6 duration-500">
                    <h3 className="text-2xl font-black text-gray-900 mb-8">Launch New Project</h3>
                    <div className="grid grid-cols-1 gap-8 mb-8">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Project Identifier</label>
                            <input
                                type="text" placeholder="e.g., Q3 Mobile Redesign" required
                                className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-gray-50 font-medium"
                                value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Mission Description</label>
                            <textarea
                                placeholder="Outline the project goals..."
                                className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all bg-gray-50 font-medium"
                                rows="3"
                                value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-4 ml-1">Squad Assignment</label>
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-4">
                                {allUsers.filter(u => u._id !== user.id).map(u => (
                                    <label key={u._id} className="flex items-center space-x-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedMembers.includes(u._id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedMembers([...selectedMembers, u._id]);
                                                } else {
                                                    setSelectedMembers(selectedMembers.filter(id => id !== u._id));
                                                }
                                            }}
                                            className="w-5 h-5 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
                                        />
                                        <span className="text-sm font-bold text-gray-600 group-hover:text-blue-600 transition-colors">{u.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="px-10 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 active:translate-y-0">Deploy Project</button>
                </form>
            )}

            {/* Projects List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(project => (
                    <div key={project._id} className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl shadow-gray-200/40 border border-white/50 p-8 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center">
                                <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 mr-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                    <Folder className="h-7 w-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-gray-900 tracking-tight">{project.name}</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Lead: {project.createdBy?.name || 'Admin'}</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm font-medium mb-8 line-clamp-3 leading-relaxed">{project.description}</p>
                        <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-xs font-black text-gray-300 uppercase tracking-tighter">Velocity</span>
                                <span className="text-sm font-black text-gray-900">
                                    {tasks.filter(t => t.projectId?._id === project._id || t.projectId === project._id).length} Active Tasks
                                </span>
                            </div>
                            <Link to={`/project/${project._id}`} className="p-3 bg-gray-50 text-gray-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {projects.length === 0 && (
                <div className="text-center py-24 glass rounded-[3rem] border-2 border-dashed border-white/50 shadow-inner group">
                    <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition duration-500"></div>
                        <Folder className="h-20 w-20 mx-auto text-gray-300 relative z-10" />
                    </div>
                    <p className="text-2xl font-black text-gray-400">Ready to start something new?</p>
                    <p className="text-sm font-medium mt-2 text-gray-400 max-w-xs mx-auto">
                        {user.role === 'admin' 
                            ? 'Create your first project to begin tracking your team\'s flow.' 
                            : 'Once your admin assigns you to a project, it will appear here.'}
                    </p>
                    {user.role === 'admin' && (
                        <button 
                            onClick={() => setShowCreate(true)}
                            className="mt-8 px-8 py-3 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:scale-105 transition-transform"
                        >
                            Initialize First Project
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

const MetricCard = ({ title, value, icon, color }) => {
    const colors = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
        yellow: "bg-yellow-50 text-yellow-600",
        red: "bg-red-50 text-red-600"
    };
    
    return (
        <div className="bg-white/40 rounded-3xl shadow-xl shadow-gray-200/50 border border-white/50 p-8 flex flex-col items-center justify-center text-center group hover:border-blue-200 transition-all duration-300 backdrop-blur-md">
            <div className={`p-4 rounded-2xl mb-4 transition-all duration-300 group-hover:scale-110 ${colors[color]}`}>
                {icon}
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{title}</p>
            <p className="text-3xl font-black text-gray-900 tracking-tighter">{value}</p>
        </div>
    );
};

export default Dashboard;
