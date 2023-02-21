const mongoose = require('mongoose')
let validator = require("validator");
let bcrypt = require("bcryptjs"); 


// model step: 1
const authModel = new mongoose.Schema(
        {
            familyName: {
                type: String, 
                trim: true,
            },
            info: {
                type: String, 
                trim: true,
            },
            username: {
                type: String, 
                trim: true,
            },
            userID: {
                type: String, 
                trim: true,
            },
            fastname: {
                type: String, 
                trim: true,
            },
            lastname: {
                type: String, 
                trim: true,
            },
            email: {
                type: String,
                trim: true,
                lowercase: true,
                unique: true,
                validate:[validator.isEmail, "Provided email is not valid."],
                required:[true, "Email address is require"]
            },
            password: {
                type: String, 
                trim: true,
                required:[true, "Password is require"]
            }, 
            role:{
                type:String,
                default: "user",
                enum:["user", "administrator"], 
            },

            status:{
                type: String,
                default:"inactive",
                enum:["active", "inactive"]
            },
            confirmationToken: {
                type: String, 
                trim: true,
            },
            confirmationTokenExpires: {
                type: Date,  
            },
            passwordChangeAt:Date,
            passwordRestToken:String,
            passwordTokenExpires:Date, 
        },
        {
             timestamps: true, 
        }
    );

    // Password hash by bcrypt 
    authModel.pre("save", function (next) {
        const password= this.password;

        const hashPassword = bcrypt.hashSync(password);

        this.password = hashPassword; 
        next();
    })

 
     
module.exports = mongoose.model('users', authModel)