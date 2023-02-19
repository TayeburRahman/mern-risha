const mongoose = require('mongoose')
let validator = require("validator"); 


// model step: 1
const projectInputModel = new mongoose.Schema(
        {
            category : {
                type: String, 
                trim: true,
                required: [true, "Category tittle is require"],
            },
            subcategory: {
                type: String, 
                trim: true,
                required: [true, "Category tittle is require"],
            }, 
            company_cate : {
                type: String, 
                trim: true,
                required: [true, "Category tittle is require"],
            },
            com_sub_cate: {
                type: String,  
                trim: true,
            },
            input:{
                type: Array,  
            }
        },
        {
             timestamps: true, 
        }
    );
 

 
     
module.exports = mongoose.model('projectInput', projectInputModel)