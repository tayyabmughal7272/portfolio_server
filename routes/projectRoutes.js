const express = require('express');
const router = express.Router();
const { getProjects, getProjectById, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const auth = require('../middleware/auth');
const upload = require('../middleware/cloudinaryUpload');

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', auth, upload.single('image'), createProject);
router.put('/:id', auth, upload.single('image'), updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;