const express = require('express');
const controller = require('../controllers/pokedexController');

const router = express.Router();
router.get('/', controller.selectAll);

module.exports = router;
