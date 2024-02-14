const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const controller = require("../controller/ShopController");

router.get('/TotalCredits',jwtMiddleware.verifyToken, controller.TotalCredits)
router.get('/Wins',jwtMiddleware.verifyToken, controller.TotalWins)

// router.get('/Locker', controller.Locker)
// router.get('/Lucky_Shop', controller.ViewTodayShop)
// router.get('/Item/:ID', controller.ViewItem)

// router.put('/Buying_Item/:ID',controller.TotalCredits, controller.CreditsUpdate, controller.ViewItem, controller.ItemDeduction)

module.exports = router;