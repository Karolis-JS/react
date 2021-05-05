const express = require('express')

const router = express.Router()

const middle = require('../middle/middle')
const controller = require('../controllers/main')

router.post('/upload', middle.checkRecipe, controller.uploadRecipe)
router.get('/allrecipes', controller.showAllRecipes)
router.get('/recipe/:id', controller.findRecipe)
router.post('/review', middle.checkReview, controller.uploadReview)
router.get('/getreview/:id', controller.findreview)


module.exports = router