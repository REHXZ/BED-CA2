const express = require('express');
const controllers = require('../controller/GameController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const router = express.Router();

router.get("/TotalTasks", jwtMiddleware.verifyToken, controllers.TotalTasks)
router.get("/TotalCredit", jwtMiddleware.verifyToken, controllers.TotalCredit)
router.post("/InsertUser", jwtMiddleware.verifyToken, controllers.SendCredits);
router.post("/UpdateUser", jwtMiddleware.verifyToken, controllers.UpdateCredit)
module.exports = router;