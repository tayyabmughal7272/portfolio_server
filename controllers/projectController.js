const Project = require('../models/Project');

const toArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return value;

  const trimmed = value.trim();
  if (!trimmed) return [];

  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed);
      return Array.isArray(parsed) ? parsed : value;
    } catch {
      return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseProjectPayload = (body) => {
  let payload;

  if (body && body.data !== undefined) {
    payload = typeof body.data === 'string' ? JSON.parse(body.data) : body.data;
  } else {
    payload = { ...(body || {}) };
  }

  if (payload.tech !== undefined) {
    payload.tech = toArray(payload.tech);
  }

  if (payload.features !== undefined) {
    payload.features = toArray(payload.features);
  }

  return payload;
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createProject = async (req, res) => {
  try {
    const projectData = parseProjectPayload(req.body);
    
    if (req.file) {
      projectData.image = req.file.path;
    }
    
    const project = new Project(projectData);
    await project.save();
    res.json({ success: true, project });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const projectData = parseProjectPayload(req.body);
    
    if (req.file) {
      projectData.image = req.file.path;
    }
    
    const project = await Project.findByIdAndUpdate(req.params.id, projectData, { new: true });
    res.json({ success: true, project });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProjects, getProjectById, createProject, updateProject, deleteProject };