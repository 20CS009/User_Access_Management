const { Router } = require('express');
const { createSoftware, getSoftwareList } = require('../controllers/softwareController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

const router = Router();

router.post('/', authMiddleware, roleMiddleware(['Admin']), createSoftware);
router.get('/', authMiddleware, roleMiddleware(['Employee', 'Manager']), getSoftwareList);

module.exports = router;