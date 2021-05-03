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
        let newRecipe = new recipeDb.recipeSchema
        newRecipe.title = req.body.title[0]
        newRecipe.images = images
        newRecipe.ingredients = ingredients
        newRecipe.preparation = preparation
        newRecipe.save().then(() => {
            res.send({error: false, message: 'Recipe uploaded!'})
        }).catch(e => {
            res.send({error: true, message: e})
            console.log(e)
        })
    },


}