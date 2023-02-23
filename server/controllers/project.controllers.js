 
const projectModels = require("../models/project.models");

 

const createProject  = async (req, res) => {

  try {
    const {  
      company_cate,
      com_sub_cate,
      category,
      subcategory,
      user_email, 
      input_form, 
      project_name,
      user } = req.body 
   
    const findData = await projectModels.findOne({$and: [{ subcategory }, { category }, {company_cate},{com_sub_cate}, {user_email}]})  
 
    if (findData) {    
       
       const _id = await findData._id
      const data = await projectModels.updateOne({ _id }, { $set: {project_name, input_form}}) 

      return res.status(200).json({
        data,
        status: "success",
        message: 'success'
      }); 
    } 
    
    const data = await projectModels.create({ company_cate, com_sub_cate, category, subcategory, user , user_email, project_name, input_form})
     return res.status(200).json({
      data,
      status: "success",
      message: 'success'
    });

  } catch (error) {
    return res.status(500).json({ status: "error", message: error })
  }
}

const  getSingleProject = async (req, res) => {
  try {
    const category = req.params.category
    const subcategory = req.params.subcategory  
    const company_cate = req.params.company_cate
    const com_sub_cate = req.params.com_sub_cate
    const user_email = req.params.user_email 

    const project = await projectModels.findOne({ $and: [{ category }, { subcategory }, { company_cate }, { com_sub_cate }, {user_email}]})  

    return res.status(201).send(project)
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages })
  }
}

const  getSingleProjectC = async (req, res) => {
  try {
    const category = req.params.category
    const subcategory = req.params.subcategory  
    const company_cate = req.params.company_cate
    const com_sub_cate = ""
    const user_email = req.params.user_email 

    const project = await projectModels.findOne({ $and: [{ category }, { subcategory }, { company_cate }, { com_sub_cate }, {user_email}]})  

    return res.status(201).send(project)
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages })
  }
}


const  getSingleProjectAdmin = async (req, res) => {
  try {
    const id = req.params.id
   
    const project = await projectModels.findOne({ $and: [{ _id: id }]})  

    return res.status(201).send(project)
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages })
  }
}

const  getUserCategoryProject = async (req, res) => {
  try { 
    const user_email = req.params.email
    const category = req.params.category
    const subcategory = req.params.subcategory

    const project = await projectModels.find({ $and: [{user_email}, {category}, {subcategory}] }) 

    return res.status(201).send(project)
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages })
  }
}

const  deleteUserCategoryProject = async (req, res) => {
  try { 
    const id = req.params.id

    const data = await projectModels.deleteOne({_id: id}) 

    return res.status(201).send(data)
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages })
  }
}


const  getUserAllProject = async (req, res) => {
  try { 
    const user_email = req.params.email 

    const project = await projectModels.find({ $and: [{user_email}] }) 
    console.log(project)

    return res.status(201).send(project)
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages })
  }
}


const  getAllProjectAdmin = async (req, res) => {
  try {   
    const project = await projectModels.find({}) 

    return res.status(201).send(project)
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages })
  }
}
 
 

module.exports = { createProject, getSingleProject, getAllProjectAdmin, getSingleProjectAdmin, getUserAllProject, getUserCategoryProject, deleteUserCategoryProject, getSingleProjectC }