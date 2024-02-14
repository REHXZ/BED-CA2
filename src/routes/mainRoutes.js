//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');

const jwtMiddleware = require('../middlewares/jwtMiddleware');
const bcryptMiddleware = require('../middlewares/bcryptMiddleware');
const userController = require('../controller/userController');
const messageRoute = require('../routes/messageRoute')
const GameRoute = require('../routes/GameRoutes')
const ShopRoute = require('../routes/ShopRoutes')
const LockerRoute = require('../routes/lockerRoute')
const userRoute = require('../routes/userRoutes')
//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////

router.use('/message', messageRoute)
router.use('/game', GameRoute)
router.use('/shop', ShopRoute)
router.use('/locker', LockerRoute)
router.use('/user', userRoute)


router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;    