const express = require('express');
const playerController = require('../controllers/playerController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

const router = express.Router();
router.delete("/:playerId", jwtMiddleware.verifyToken, playerController.checkPlayerBelongsToUser, playerController.DeletePlayer)

router.get("/token/player", jwtMiddleware.verifyToken, playerController.GetAllPlayers)
router.get("/", playerController.ShowAllPlayers)
router.get('/:playerId', playerController.readPlayerById);

router.post("/", jwtMiddleware.verifyToken, playerController.createNewPlayer);

router.put("/:playerId", jwtMiddleware.verifyToken, playerController.checkPlayerBelongsToUser, playerController.UpdatePlayer)
module.exports = router;
