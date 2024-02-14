const express = require('express');
const controllers = require('../controller/LockerController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const router = express.Router();

router.post("/InsertLocker", jwtMiddleware.verifyToken, controllers.InsertLocker);
router.get("/ShowLocker", jwtMiddleware.verifyToken, controllers.ShowLocker);

module.exports = router;