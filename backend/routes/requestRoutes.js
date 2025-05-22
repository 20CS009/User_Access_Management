const { Router } = require('express');
const { submitRequest, manageRequest, getPendingRequests } = require('../controllers/requestController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

const router = Router();

router.post('/', authMiddleware, roleMiddleware(['Employee']), submitRequest);
router.patch('/:id', authMiddleware, roleMiddleware(['Manager']), manageRequest);
router.get('/', authMiddleware, roleMiddleware(['Manager']), getPendingRequests);

module.exports = router;