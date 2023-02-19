const mongoose = require('mongoose')
let validator = require("validator"); 


// model step: 1
const contentModel = new mongoose.Schema(
        {
            category : {
                type: String, 
                trim: true,
                required: [true, "Category is require"],
            },
            subcategory: {
                type: String, 
                trim: true,
                required: [true, "Sub category is require"],
            }, 
            company_cate : {
                type: String, 
                trim: true,
                required: [true, "Company Category is require"],
            },
            com_sub_cate: {
                type: String,  
                trim: true,
            },
            content:{
                type: String,   
                required: [true, "Content is require"],
            },  
        },
        {
             timestamps: true, 
        }
    );
 

 
     
module.exports = mongoose.model('content', contentModel)