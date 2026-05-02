import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Calendar, User as UserIcon, Plus, Folder } from 'lucide-react';

const ProjectDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [editMode, setEditMode] = useState(false);
    
    const [newTask, setNewTask] = useState({ title: '', description: '', assignedTo: '', dueDate: '' });
    const [editProject, setEditProject] = useState({ name: '', description: '', members: [] });
    const [commentInputs, setCommentInputs] = useState({});

    useEffect(() => {
        fetchData();
        if (user.role === 'admin') fetchUsers();
    }, [id]);

    const fetchData = async () => {
        try {
            const [projRes, taskRes] = await Promise.all([
                api.get(`/projects/${id}`),
                api.get(`/tasks?projectId=${id}`)
            ]);
            setProject(projRes.data);
            setTasks(taskRes.data);
            setEditProject({
                name: projRes.data.name,
                description: projRes.data.description,
                members: projRes.data.members.map(m => m._id)
            });
        } catch (error) {
            console.error("Error fetching project details:", error);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await api.get('/auth/users');
            setUsers(res.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tasks', { ...newTask, projectId: id });
            setNewTask({ title: '', description: '', assignedTo: '', dueDate: '' });
            setShowCreateTask(false);
            fetchData();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleUpdateProject = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/projects/${id}`, editProject);
            setEditMode(false);
            fetchData();
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await api.put(`/tasks/${taskId}`, { status: newStatus });
            fetchData();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleAddComment = async (taskId) => {
        if (!commentInputs[taskId]) return;
        try {
            await api.post(`/tasks/${taskId}/comment`, { message: commentInputs[taskId] });
            setCommentInputs({ ...commentInputs, [taskId]: '' });
            fetchData();
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    if (!project) return <div className="p-8 text-center text-gray-500">Loading project...</div>;

    const statusColors = {
        'pending': 'bg-gray-100 text-gray-800',
        'in-progress': 'bg-blue-100 text-blue-800',
        'completed': 'bg-green-100 text-green-800'
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 border-b border-gray-200 pb-6 flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">{project.name}</h1>
                    <p className="text-lg text-gray-600 mt-2 max-w-3xl">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4 items-center">
                        <span className="text-xs font-black uppercase tracking-widest text-gray-400 mr-2">Team Members:</span>
                        {project.members.map(m => (
                            <span key={m._id} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {m.name}
                            </span>
                        ))}
                    </div>
                </div>
                {user.role === 'admin' && (
                    <button
                        onClick={() => setEditMode(!editMode)}
                        className="px-4 py-2 text-sm font-bold text-blue-600 border-2 border-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                    >
                        {editMode ? 'Cancel Editing' : 'Edit Project'}
                    </button>
                )}
            </div>

            {editMode && user.role === 'admin' && (
                <form onSubmit={handleUpdateProject} className="glass p-8 rounded-[2rem] shadow-2xl border border-white/50 mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Edit Project Details</h3>
                    <div className="grid grid-cols-1 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Project Name</label>
                            <input
                                type="text" required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50"
                                value={editProject.name} onChange={e => setEditProject({...editProject, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                            <textarea
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50"
                                rows="3"
                                value={editProject.description} onChange={e => setEditProject({...editProject, description: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">Project Members</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                {users.filter(u => u._id !== project.createdBy._id).map(u => (
                                    <label key={u._id} className="flex items-center space-x-3 text-sm font-medium text-gray-700 cursor-pointer hover:text-blue-600 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={editProject.members.includes(u._id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setEditProject({...editProject, members: [...editProject.members, u._id]});
                                                } else {
                                                    setEditProject({...editProject, members: editProject.members.filter(mid => mid !== u._id)});
                                                }
                                            }}
                                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span>{u.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md transition-all">Update Project</button>
                </form>
            )}

            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-gray-900">Task Board</h2>
                {user.role === 'admin' && !editMode && (
                    <button
                        onClick={() => setShowCreateTask(!showCreateTask)}
                        className="flex items-center px-5 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 shadow-lg transition-all"
                    >
                        <Plus className="h-5 w-5 mr-2" /> Create Task
                    </button>
                )}
            </div>

            {showCreateTask && user.role === 'admin' && (
                <form onSubmit={handleCreateTask} className="glass p-8 rounded-[2rem] shadow-2xl border border-white/50 mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Create New Task</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Task Title</label>
                            <input
                                type="text" placeholder="e.g., API Integration" required
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50"
                                value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Assign To</label>
                            <select
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50 cursor-pointer" required
                                value={newTask.assignedTo} onChange={e => setNewTask({...newTask, assignedTo: e.target.value})}
                            >
                                <option value="">Select team member...</option>
                                {project.members.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Due Date</label>
                            <input
                                type="date" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50" required
                                value={newTask.dueDate} onChange={e => setNewTask({...newTask, dueDate: e.target.value})}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                            <textarea
                                placeholder="What needs to be done?" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-gray-50"
                                rows="2"
                                value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})}
                            />
                        </div>
                    </div>
                    <button type="submit" className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-md transition-all">Add Task to Project</button>
                </form>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {tasks.map(task => (
                    <div key={task._id} className="bg-white/60 backdrop-blur-lg rounded-[2rem] shadow-xl shadow-gray-200/40 border border-white/50 flex flex-col overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="p-6 border-b border-gray-50 flex-grow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{task.title}</h3>
                                <select
                                    value={task.status}
                                    onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                    className={`text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-lg border-none outline-none cursor-pointer shadow-sm transition-all ${statusColors[task.status]}`}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <p className="text-gray-600 mb-6 text-sm leading-relaxed">{task.description}</p>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center text-xs font-bold text-gray-400 bg-gray-50 px-3 py-2 rounded-lg w-fit">
                                    <UserIcon className="h-3.5 w-3.5 mr-2 text-blue-500" />
                                    <span className="text-gray-400 mr-1">Assigned to:</span>
                                    <span className="text-gray-900">{task.assignedTo?.name || 'Unassigned'}</span>
                                </div>
                                <div className="flex items-center text-xs font-bold text-gray-400 bg-gray-50 px-3 py-2 rounded-lg w-fit">
                                    <Calendar className="h-3.5 w-3.5 mr-2 text-red-500" />
                                    <span className="text-gray-400 mr-1">Due Date:</span>
                                    <span className="text-gray-900">{task.dueDate ? new Date(task.dueDate).toLocaleDateString(undefined, { dateStyle: 'medium' }) : 'No deadline'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="bg-gray-50 p-6 border-t border-gray-100">
                            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 flex items-center mb-4">
                                <MessageSquare className="h-3.5 w-3.5 mr-2 text-blue-400" /> Activity Log
                            </h4>
                            <div className="space-y-3 max-h-40 overflow-y-auto mb-4 pr-1 scrollbar-thin scrollbar-thumb-gray-200">
                                {task.comments.length === 0 ? (
                                    <p className="text-xs text-gray-400 italic bg-white p-3 rounded-xl border border-dashed border-gray-200 text-center">No updates recorded yet.</p>
                                ) : (
                                    task.comments.map((comment, idx) => (
                                        <div key={idx} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-black text-blue-600 text-[10px] uppercase tracking-tighter">{comment.userId?.name}</span>
                                                <span className="text-[9px] text-gray-300 font-bold">{new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <p className="text-gray-700 text-xs font-medium leading-normal">{comment.message}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Add a progress update..."
                                    className="flex-grow px-4 py-2.5 text-xs font-medium border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white bg-white transition-all shadow-inner"
                                    value={commentInputs[task._id] || ''}
                                    onChange={(e) => setCommentInputs({ ...commentInputs, [task._id]: e.target.value })}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment(task._id)}
                                />
                                <button
                                    onClick={() => handleAddComment(task._id)}
                                    className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md active:scale-95"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {tasks.length === 0 && (
                <div className="text-center py-20 text-gray-400 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                    <Folder className="h-12 w-12 mx-auto mb-4 text-gray-200" />
                    <p className="text-lg font-bold">This project is currently empty.</p>
                    <p className="text-sm">Start by creating your first task above.</p>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;
