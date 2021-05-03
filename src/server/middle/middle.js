
module.exports = {
    checkRecipe: async (req, res, next) => {
        console.log(req.body)
        console.log(req.body.title[0].length)
        function error(status, message) {
            return res.send({error: status, message: message})
        }
        if (req.body.title[0].length < 5) {
            return error(true, 'Title is too short!')
        }
        if (req.body.images.length < 1) {
            return error(true, 'Add an image!')
        }
        if (req.body.ingredients.length < 1) {
            return error(true, 'Add some ingredients!')
        }
        if (req.body.preparation.length < 1) {
            return error(true, 'You forgot to add preparation steps!')
        }
        next()
    },

}