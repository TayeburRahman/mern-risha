const mongoose = require('mongoose')
let validator = require("validator");


// model step: 1
const categoryModels = new mongoose.Schema(
    {

        tittle: {
            type: String,
            trim: true,
            required: [true, "Category tittle is require"],
        },
        subCategory: {
            type: Array,
        },
        avatar: {
            type: String,
        },
        description: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);




module.exports = mongoose.model('categories', categoryModels)