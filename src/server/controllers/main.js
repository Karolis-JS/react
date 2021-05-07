const recipeDb = require('../schemas/schema')
const recipeFavoriteDB = require('../schemas/favoriteSchema')

module.exports = {
    uploadRecipe: async (req, res) => {
        let images = []
        req.body.images.map(img => {
            images.push(img)
        })
        let ingredients = []
        req.body.ingredients.map(ing => {
            ingredients.push({value: ing.value, quantity: ing.quantity})
        })
        let preparation = []
        req.body.preparation.map(prep => {
            preparation.push(prep)
        })
        let newRecipe = new recipeDb
        newRecipe.title = req.body.title
        newRecipe.images = images
        newRecipe.ingredients = ingredients
        newRecipe.preparation = preparation
        newRecipe.status = false
        newRecipe.save().then(() => {
            res.send({error: false, message: 'Recipe uploaded!'})
        }).catch(e => {
            res.send({error: true, message: e})
        })
    },
    showAllRecipes: async (req, res) => {
        let recipe = await recipeDb.find()
        res.send(recipe)
    },
    findRecipe: async (req, res) => {
        let recipe = await recipeDb.findById(req.params.id)
        res.send(recipe)
    },
    uploadReview: async (req, res) => {
        await recipeDb.findByIdAndUpdate({_id: req.body.recipeId},
            {
                $push: { review: req.body},
            },
            {returnOriginal: false})
            .then(() => {
                res.send({error: false, msg: "Review add successful"})

            }).catch(e => {
                res.send({error: true, msg: "Wrong data", e})
            })
    },
    findreview: async (req, res) => {
        let recipe = await recipeDb.findById(req.params.id)
        res.send(recipe)
    },
    addFavorite: async (req, res) => {
        await recipeDb.findOneAndUpdate({_id: req.params.id},
            {$set: {status: true}},
            {returnOriginal: false})
        let newFavoriteRecipe = new recipeFavoriteDB
        newFavoriteRecipe.recipeId = req.params.id
        newFavoriteRecipe.save().then(() => {
            res.send({error: false, message: 'Favorite was added!'})
        }).catch(e => {
            res.send({error: true, message: e})
        })
    },
    showFavoritesRecipes: async (req, res) => {
        let favorite = await recipeFavoriteDB.find()
        let allFavorite = favorite.map(async (favorite, index) => {
            return recipeDb.findOne({_id: favorite.recipeId})
        })
       Promise.all(allFavorite).then(data => {
           res.send(data)})
    },
    RemoveFavorite: async (req, res) => {
        await recipeDb.findOneAndUpdate({_id: req.params.id},
            {$set: {status: false}},
            {returnOriginal: false})
        await recipeFavoriteDB.findOneAndDelete({recipeId: req.params.id})
        let favorite = await recipeFavoriteDB.find()
        let allFavorite = favorite.map(async (favorite, index) => {
            return recipeDb.findOne({_id: favorite.recipeId})
        })
        Promise.all(allFavorite).then(data => {
            res.send(data)})
    },
    RemoveRecipe: async (req, res) => {
        await recipeDb.findOneAndDelete({_id: req.params.id})
        let recipe = await recipeDb.find()
        res.send(recipe)
    },
    searchByKeyword: async (req, res) => {
        let search = req.body
        let filterArr = []
        let recipes = await recipeDb.find()
        recipes.map(rec => {
            let num = 0
            rec.ingredients.map(ingr => {
                search.map(item => {
                    if (item === ingr.value){
                        num++
                    }
                })
                if (num === search.length) {
                    !filterArr.includes(rec) ? filterArr.push(rec) : null
                }
            })
        })
        res.send(filterArr)
    }
}