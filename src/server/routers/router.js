const express = require('express')

const router = express.Router()

const middle = require('../middle/middle')
const controller = require('../controllers/main')

router.post('/upload', middle.checkRecipe, controller.uploadRecipe)


module.exports = router