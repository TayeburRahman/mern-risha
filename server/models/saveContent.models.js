const mongoose = require('mongoose')
let validator = require("validator"); 


// model step: 1
const saveContentModel = new mongoose.Schema(
        {
            project : {
                type: Array,  
                trim: true,
                required: [true, "Project is require"]
            },
            user: {
                type: Object,  
                trim: true,
            },
            userEmail: {
                type: String,  
                trim: true,
                required: [true, "User Email tittle is require"],
            },
            content: {
                type: String,  
                trim: true,
                required: [true, "Content is require"],
            },
        },
        {
             timestamps: true, 
        }
    );
 

 
     
module.exports = mongoose.model('savecontent', saveContentModel)