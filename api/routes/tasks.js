const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Create task (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
    try {
        const { title, description, projectId, assignedTo, dueDate } = req.body;
        const newTask = new Task({
            title,
            description,
            projectId,
            assignedTo,
            dueDate
        });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all tasks
router.get('/', verifyToken, async (req, res) => {
    try {
        let filter = {};

        if (req.query.projectId) {
            // Check if user has access to this project
            const Project = require('../models/Project');
            const project = await Project.findById(req.query.projectId);
            if (!project) return res.status(404).json({ message: 'Project not found' });

            if (req.user.role !== 'admin' && !project.members.includes(req.user.id)) {
                return res.status(403).json({ message: 'Access denied to this project tasks' });
            }
            filter.projectId = req.query.projectId;
        } else if (req.user.role !== 'admin') {
            // For dashboard view (no projectId), only show assigned tasks for members
            filter.assignedTo = req.user.id;
        } else if (req.query.assignedTo) {
            filter.assignedTo = req.query.assignedTo;
        }

        const tasks = await Task.find(filter)
            .populate('assignedTo', 'name email')
            .populate('projectId', 'name')
            .populate('comments.userId', 'name');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get task by ID
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('assignedTo', 'name email')
            .populate('projectId', 'name')
            .populate('comments.userId', 'name');
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update task status
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Member/Admin can update status
        task.status = status || task.status;
        await task.save();

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a progress comment
router.post('/:id/comment', verifyToken, async (req, res) => {
    try {
        const { message } = req.body;
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        task.comments.push({
            userId: req.user.id,
            message,
            createdAt: new Date()
        });

        await task.save();
        
        // Return updated task populated with user names
        const updatedTask = await Task.findById(req.params.id)
            .populate('assignedTo', 'name email')
            .populate('projectId', 'name')
            .populate('comments.userId', 'name');

        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
