const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const favoriteRecipesSchema = new Schema({
    recipeId: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("favoriteRecipesModel", favoriteRecipesSchema)