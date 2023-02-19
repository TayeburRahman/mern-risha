const mongoose = require('mongoose')
let validator = require("validator"); 


// model step: 1
const projectModel = new mongoose.Schema(
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
            user_email:{
                type: String,  
                trim: true,
                required: [true, "Category tittle is require"],
            },
            user:{
                type: Object,  
            },
            project_name:{
                type: String,  
            },
            input_form:{
                type: Object,  
            }
        },
        {
             timestamps: true, 
        }
    );
 

 
     
module.exports = mongoose.model('project', projectModel)