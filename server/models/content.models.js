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
            inputValue0:{
                type: String,   
                required: [true, "Content is require"],
            },  
            inputValue1:{
                type: String,    
            },  
            inputValue2:{
                type: String,    
            },  
            inputValue3:{
                type: String,    
            },  
            inputValue4:{
                type: String,    
            },  
            inputValue5:{
                type: String,    
            },  
            inputValue6:{
                type: String,    
            },  
            inputValue7:{
                type: String,    
            },
            inputValue8:{
                type: String,    
            },
            inputValueEnd:{
                type: String,    
            }, 
        },
        {
             timestamps: true, 
        }
    );
 

 
     
module.exports = mongoose.model('content', contentModel)