const express = require('express')

const router = express.Router()

const middle = require('../middle/middle')
const controller = require('../controllers/main')

router.post('/upload', middle.checkRecipe, controller.uploadRecipe)
router.post('/review', middle.checkReview, controller.uploadReview)
router.get('/allrecipes', controller.showAllRecipes)
router.get('/recipe/:id', controller.findRecipe)
router.get('/getreview/:id', controller.findreview)
router.get('/favorite/:id', controller.addFavorite)
router.get('/allfavorites', controller.showFavoritesRecipes)
router.get('/deleterecipes/:id', controller.RemoveRecipe)
router.post('/search', controller.searchByKeyword)


module.exports = router