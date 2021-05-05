const recipeDb = require('../schemas/schema')

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
    }
}