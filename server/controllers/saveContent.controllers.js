  
let bcrypt = require("bcryptjs"); 
const saveContentModels = require("../models/saveContent.models");
 


//  response  
const createSaveContent = async (req, res ) => {   
 
    try { 
      const {project, user, userEmail, content} = req.body   
       
    
      const response = await saveContentModels.create({project, user, userEmail, content})  
     
     return res.status(200).json({
        response,
      status: "success", 
      message:'content save success'});

   } catch (error) { 
     return res.status(500).json({status: "error", message: error})
   }
}


 

const getUserContent = async (req, res) => {  
    try { 
      const {email, id} = req.params   
 

      const response = await saveContentModels.findOne(
        { userEmail: email },
        {
            $pull: {
              project: {
                _id: id,
                },
            },
        },
        { returnOriginal: false }
    );

    console.log("response",response)

      return res.status(201).send(response) 
     } catch (error) {
      return res.status(401).json({status: "error", message: error.massages})
    }
}
 


  const getAllContent = async (req, res) => {  
    try { 
     const content = await  saveContentModels.find({})  

      return res.status(201).send(content) 
     } catch (error) {
      return res.status(401).json({status: "error", message: error.massages})
    }
}
 
 

 
 
  module.exports={  createSaveContent,getUserContent }