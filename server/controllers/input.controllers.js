const inputModels = require("../models/input.models");
const choicesModels = require("../models/input.models")
const projectInputModel = require("../models/input.models")

 

const createProjectSubInput  = async (req, res) => {

  try {
    const {  
      company_cate,
      com_sub_cate,
      category,
      subcategory,
      input } = req.body 
 

    const findData = await projectInputModel.findOne({$and: [{ subcategory }, { category }, {company_cate},{com_sub_cate}]}) 
 
 
    if (findData) {    
       const _id = await findData._id
      const data = await projectInputModel.updateOne({ _id }, { $push: {input}}) 
      return res.status(200).json({
        data,
        status: "success",
        message: 'success'
      }); 
    } 

    const data = await projectInputModel.create({ company_cate, com_sub_cate, category, subcategory, input })
     return res.status(200).json({
      data,
      status: "success",
      message: 'success'
    });

  } catch (error) {
    return res.status(500).json({ status: "error", message: error })
  }
}



const createProjectInput  = async (req, res) => {

  try {
    const {  
      company_cate, 
      category,
      subcategory,
      input, com_sub_cate } = req.body 
  
    const findData = await projectInputModel.findOne({$and: [{ subcategory }, { category }, {company_cate},{com_sub_cate}]}) 
 

    if (findData) {     
       const _id = await findData._id
      const data = await projectInputModel.updateOne({ _id }, { $push: {input}})
      console.log('data2',  data); 
      return res.status(200).json({
        data,
        status: "success",
        message: 'success'
      }); 
    } 

    const data = await projectInputModel.create({ company_cate, category, subcategory, com_sub_cate, input })

     return res.status(200).json({
      data,
      status: "success",
      message: 'success'
    });

  } catch (error) {
    return res.status(500).json({ status: "error", message: error })
  }
}

const  getProjectAllSubInput = async (req, res) => {
  try {
    const category = req.params.category
    const subcategory = req.params.subcategory  
    const company = await projectInputModel.find({ $and: [{ category }, { subcategory }] }) 

    return res.status(201).send(company)
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages })
  }
}


const  getProjectInput = async (req, res) => {
  try {
    const category = req.body.category
    const subcategory = req.body?.subcategory  
    const company_cate = req.body?.company_cate  
    const com_sub_cate = req.body?.com_sub_cate 

  
    const company = await projectInputModel.findOne({ $and: [{ category }, { subcategory }, {company_cate}, {com_sub_cate}] })  

    return res.status(201).send(company)
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages })
  }
}

const deleteInputArray = async (req, res ) => {  
  try { 
    const id = req.params.id   
    const input = await projectInputModel.deleteOne({_id: id})  
 
   return res.status(200).json({ 
    input,
    status: "success", 
    message:'category delete success'});

 } catch (error) { 
   return res.status(500).json({status: "error", message: error})
 }
}



const updateSignalInput = async (req, res ) => {  
  try { 
    const id = req.params.id   
    const inputData = req.body.inputData  
    const newInputData = req.body.newInputData  

    console.log(inputData)
 

    const query = { _id: id, "input.inputData": inputData };

    const updateDocument = {
      $set: { "input.$.inputData": newInputData }
    };

    const result = await projectInputModel.updateOne(query, updateDocument);

     
   return res.status(200).json({
    result,
    status: "success", 
    message:'category post success'});

 } catch (error) { 
   return res.status(500).json({status: "error", message: error})
 }
}


const deleteSignalInput  = async (req, res ) => {  
  try { 
    const id = req.params.id   
    const inputData = req.body.inputData   

         const response = await projectInputModel.findOneAndUpdate(
            { _id: id },
            {
                $pull: {
                  input: {
                    inputData: inputData,
                    },
                },
            },
            { returnOriginal: false }
        );
  
   return res.status(200).json({ 
    response,
    status: "success", 
    message:'category delete success'});

 } catch (error) { 
   return res.status(500).json({status: "error", message: error})
 }
}




const  getProjectInputC = async (req, res) => {
  try {
    const category = req.params.category
    const subcategory = req.params.subcategory  
    const company_cate = req.params.company_cate   
    const com_sub_cate = ""

    console.log(category, subcategory, company_cate, com_sub_cate)
  

    const company = await projectInputModel.findOne({ $and: [{ category }, { subcategory }, {company_cate}, {com_sub_cate}] }) 
  
    return res.status(201).send(company)
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages })
  }
}
 

module.exports = { createProjectSubInput, getProjectAllSubInput, getProjectInput, createProjectInput, getProjectInputC, deleteInputArray, deleteSignalInput, updateSignalInput }