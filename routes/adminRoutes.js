const express = require('express');
const router = express.Router();
const { login, setupAdmin, setupAdminGet } = require('../controllers/adminController');

router.post('/login', login);
router.post('/setup', setupAdmin);
router.get('/setup', setupAdminGet);

module.exports = router;