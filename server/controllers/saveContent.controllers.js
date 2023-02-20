  
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
     const content = await  saveContentModels.find({})  

      return res.status(201).send(content) 
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
 

//   const updateUsers= async (req , res) => {
    
//   try {
//        await userModel.updateOne({
//          email: req.params.email
//         },
//           req.body
//       );
//       res.status(201).json({massages:'Card Updated Successfully'});
//   } catch (error) {
//       return res
//           .status(500).json({massages: error.massages}) 
//   }
// };


 
 
  module.exports={  createSaveContent }