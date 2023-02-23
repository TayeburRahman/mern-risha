 
const contentModels = require("../models/content.models");
const projectModels = require("../models/project.models");

 

const createContent  = async (req, res) => {

  try {
    const {  
      company_cate,
      com_sub_cate,
      category,
      subcategory, 
      inputValue0, inputValue1, inputValue2, inputValue3, inputValue4, inputValue5, inputValue6, inputValue7, inputValue8,inputValueEnd } = req.body  

    if (com_sub_cate) {  
     const data = await contentModels.create({ company_cate, com_sub_cate, category, subcategory , inputValue0, inputValue1, inputValue2, inputValue3, inputValue4, inputValue5, inputValue6, inputValue7, inputValue8,inputValueEnd})

      return res.status(200).json({
        data,
        status: "success",
        message: 'success'
      }); 
    } 
    
    const data = await contentModels.create({ company_cate, category, subcategory , inputValue0,inputValue1, inputValue2, inputValue3, inputValue4, inputValue5, inputValue6, inputValue7, inputValue8,inputValueEnd}) 
     return res.status(200).json({
      data,
      status: "success",
      message: 'success'
    });

  } catch (error) {
    return res.status(500).json({ status: "error", message: error })
  }
}

const  getContent = async (req, res) => {
  try {
    const {  
      company_cate,
      com_sub_cate,
      category,
      subcategory  } = req.params    

    if(com_sub_cate){
        const data = await contentModels.find({ $and: [{ category }, { subcategory }, { company_cate }, { com_sub_cate }]})  

        return res.status(200).json({
            data,
            status: "success",
            message: 'success'
          });
    }

    const data = await contentModels.find({ $and: [{ category }, { subcategory }, { company_cate }]})  

    return res.status(200).json({
        data,
        status: "success",
        message: 'success'
      });

  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages })
  }
}

const getAllContent = async (req, res) => {  
  try { 
   const content = await  contentModels.find({})   

    return res.status(201).send(content) 
   } catch (error) {
    return res.status(401).json({status: "error", message: error.massages})
  }
}


const  updateContent= async (req, res) => {
  try {
    const id = req.params.id
    const content = req.body.content 
    const project = await contentModels.updateOne({_id: id}, {$set:{content}})  

    return res.status(201).send(project)
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages })
  }
}


const  deleteContent = async (req, res) => {
  try { 
    const id = req.params.id

    const data = await contentModels.deleteOne({_id: id}) 

    return res.status(201).send(data)
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages })
  }
}


 
 

module.exports = {createContent , getContent , updateContent , deleteContent, getAllContent }