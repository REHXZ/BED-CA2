const express = require('express');
const controller = require('../controller/messageController');
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const router = express.Router();

router.get('/', jwtMiddleware.verifyToken, controller.readAllMessage)
router.post('/', jwtMiddleware.verifyToken, controller.createMessage)
router.delete('/:id', jwtMiddleware.verifyToken, controller.deleteMessageById);
router.put('/:id', jwtMiddleware.verifyToken, controller.updateMessageById);
router.get('/TotalMessages', jwtMiddleware.verifyToken, controller.TotalMessages)

module.exports = router