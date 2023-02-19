 
  
const categoryModels = require("../models/category.models");
 


//  response  
const createCategory = async (req, res ) => {  
    try { 
      const bodyData = req.body 

      if(req.file){
        bodyData.avatar = req.file.path
      }  

      console.log('req.file', req.file)
    const category = await categoryModels.create(bodyData)   
     return res.status(200).json({
      category,
      status: "success", 
      message:'category post success'});

   } catch (error) { 
     return res.status(500).json({status: "error", message: error})
   }
}
 

const signalCategory = async (req, res ) => {  
  try { 
    const id = req.params.id  
    const category = await categoryModels.findById({_id: id})  
 
   return res.status(200).json({
    category,
    subcategory: category?.subCategory,
    status: "success", 
    message:'category post success'});

 } catch (error) { 
   return res.status(500).json({status: "error", message: error})
 }
}


const updateSignalCategory = async (req, res ) => {  
  try { 
    const id = req.params.id  
    const description = req.body.description  
    const category = await categoryModels.updateOne({_id: id}, {$set:{description}})  
 
   return res.status(200).json({
    category,
    subcategory: category?.subCategory,
    status: "success", 
    message:'category update success'});

 } catch (error) { 
   return res.status(500).json({status: "error", message: error})
 }
}

const deleteSignalCategory = async (req, res ) => {  
  try { 
    const id = req.params.id   
    const category = await categoryModels.deleteOne({_id: id})  
 
   return res.status(200).json({ 
    category,
    status: "success", 
    message:'category delete success'});

 } catch (error) { 
   return res.status(500).json({status: "error", message: error})
 }
}


const signalSubCategory = async (req, res ) => {  
  try { 
    const tittle = req.params.tittle   
    const category = await categoryModels.findOne({tittle: tittle})  
     
   return res.status(200).json({
    category,
    subcategory: category?.subCategory,
    status: "success", 
    message:'category post success'});

 } catch (error) { 
   return res.status(500).json({status: "error", message: error})
 }
}

const updateSignalSubCategory = async (req, res ) => {  
  try { 
    const id = req.params.id   
    const tittle = req.params.tittle
    const description = req.body.description 

    const query = { _id: id, "subCategory.tittle": tittle };

    const updateDocument = {
      $set: { "subCategory.$.description": description }
    };

    const result = await categoryModels.updateOne(query, updateDocument);

     
   return res.status(200).json({
    result,
    status: "success", 
    message:'category post success'});

 } catch (error) { 
   return res.status(500).json({status: "error", message: error})
 }
}

const deleteSignalSubCategory = async (req, res ) => {  
  try { 
    const id = req.params.id   
    const tittle = req.params.tittle 

         const response = await categoryModels.findOneAndUpdate(
            { _id: id },
            {
                $pull: {
                  subCategory: {
                    tittle: tittle,
                    },
                },
            },
            { returnOriginal: false }
        );
     
   return res.status(200).json({
    response,
    status: "success", 
    message:'sub category delete success'});

 } catch (error) { 
   return res.status(500).json({status: "error", message: error})
 }
}

  const getAllCategory = async (req, res) => {  
    try { 
     const category = await  categoryModels.find({})   

      return res.status(201).send(category) 
     } catch (error) {
      return res.status(401).json({status: "error", message: error.massages})
    }
}
 
 
const createSubCategory = async (req, res ) => {  

  const id = req.params.id  

  try { 
    const bodyData = req.body  
    if(req.file){
      bodyData.avatar = req.file.path
    }  
  const category = await categoryModels.updateMany({_id: id}, {$push:{subCategory: bodyData}})   
 
   return res.status(200).json({
    category,
    status: "success", 
    message:'category post success'});

 } catch (error) { 
   return res.status(500).json({status: "error", message: error})
 }
}

 

 


 
 
  module.exports={  createCategory, getAllCategory, signalCategory, createSubCategory, signalSubCategory, updateSignalCategory, deleteSignalCategory, updateSignalSubCategory, deleteSignalSubCategory}