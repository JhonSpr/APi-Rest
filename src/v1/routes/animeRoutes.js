const express = require('express')
const animeController = require('../../controllers/AnimeController')
const router = express.Router()

router.get('/', animeController.getAllAnimes)
router.get('/:tipo', animeController.getAllAnimes)

module.exports = router
