const choicesModels = require("../models/input.models")
const subcategoryModels = require("../models/subcategory.models")

 

const createCompanyCategory  = async (req, res) => {

  try {
    const { category, subcategory, companyCategory } = req.body 
    const findData = await subcategoryModels.findOne({$and: [{ subcategory }, { category }, { company_cate: companyCategory}]})
 
    if (findData) {    
      return res.status(401).json({ 
        status: "error",
        message: `Error, Already Added to company category ~ ${companyCategory}` 
      }); 
    } 

    const data = await subcategoryModels.create({ category, subcategory, company_cate: companyCategory })

     return res.status(200).json({
      data,
      status: "success",
      message: 'success'
    });

  } catch (error) {
    return res.status(500).json({ status: "error", message: error })
  }
}

const  getCompanyAllCategory = async (req, res) => {
  try {
    const category = req.params.category
    const subcategory = req.params.subcategory 
    // console.log(req.params)
    const company = await subcategoryModels.find({ $and: [{ category }, { subcategory }] })
    return res.status(201).send(company)
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages })
  }
}


const deleteCompanyCategory  = async (req, res) => {

  try {
    const id = req.params.id 

    const deleteData = await subcategoryModels.deleteOne({_id: id})
  
     return res.status(200).json({
      deleteData,
      status: "success",
      message: 'Delete success'
    });

  } catch (error) {
    return res.status(500).json({ status: "error", message: error })
  }
}


const deleteSubCompanyCategory  = async (req, res) => {

  try {
    const id = req.params.id 
    const data = req.params.data 

    console.log(data)

    const response = await subcategoryModels.findOneAndUpdate(
      { _id: id },
      {
          $pull: {
            com_sub_cate: {
              data
              }
          }  ,
      },
      { returnOriginal: false }
  );
  
     return res.status(200).json({
      response,
      status: "success",
      message: 'Delete success'
    });

  } catch (error) {
    return res.status(500).json({ status: "error", message: error })
  }
}




const createCompanySubCategory  = async (req, res) => {

  try {
    const {  sub_cate, id } = req.body   

      const data = await subcategoryModels.updateOne({ _id: id }, { $push: { com_sub_cate:  sub_cate}}) 

      return res.status(200).json({
        data,
        status: "success",
        message: 'success'
      }); 

  } catch (error) {
    return res.status(500).json({ status: "error", message: error })
  }
}





const getCoSingleCaAllSubCategory = async (req, res) => {
  try {
    const category = req.params.category
    const subcategory = req.params.subcategory
    const company_cate = req.params.company_cate 
    
    const company = await subcategoryModels.findOne({ $and: [{ category }, { subcategory }, {company_cate}] }) 
    return res.status(201).send({
      company,
      status: "success",
      message: 'success'
    })
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages })
  }
}



// const getCompanyCategory = async (req, res) => {
//   try {
//     const category = req.params.category
//     const subcategory = req.params.subcategory
//     console.log(req.params)
//     const input = await subcategoryModels.find({ $and: [{ category }, { subcategory }] })
//     return res.status(201).send(input.input)
//   } catch (error) {
//     return res.status(401).json({ status: "error", message: error.massages })
//   }
// }

 


module.exports = { createCompanyCategory, getCompanyAllCategory, createCompanySubCategory, getCoSingleCaAllSubCategory, deleteCompanyCategory, deleteSubCompanyCategory}