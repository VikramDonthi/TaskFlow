const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Create project (Admin only)
router.post('/', verifyToken, isAdmin, async (req, res) => {
    try {
        const { name, description, members } = req.body;
        const newProject = new Project({
            name,
            description,
            createdBy: req.user.id,
            members: members || []
        });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all projects
router.get('/', verifyToken, async (req, res) => {
    try {
        let filter = {};
        if (req.user.role !== 'admin') {
            filter = { members: req.user.id };
        }
        const projects = await Project.find(filter).populate('members', 'name email').populate('createdBy', 'name');
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get single project
router.get('/:id', verifyToken, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('members', 'name email').populate('createdBy', 'name');
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update project (Admin only)
router.put('/:id', verifyToken, isAdmin, async (req, res) => {
    try {
        const { name, description, members } = req.body;
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        project.name = name || project.name;
        project.description = description || project.description;
        project.members = members || project.members;

        await project.save();
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
