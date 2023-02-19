const { createProjectSubInput, getProjectAllSubInput, getProjectInput, createProjectInput, getProjectInputC, deleteInputArray, deleteSignalInput, updateSignalInput } = require("../controllers/input.controllers");
const { createCompanyCategory, createCompanySubCategory, getCompanyAllCategory, getCoSingleCaAllSubCategory, deleteCompanyCategory, deleteSubCompanyCategory } = require("../controllers/subcategory.controllers");

 

const router = require("express").Router();
 
router.route('/company-c').post(createCompanyCategory); 
router.route('/get/:category/:subcategory').get(getCompanyAllCategory); 
router.route('/company-sub/:category/:subcategory/:company_cate').get(getCoSingleCaAllSubCategory);   
router.route('/company-c/sub').post(createCompanySubCategory);
router.route('/create/company-sub/input').post(createProjectSubInput);
router.route('/create/company/input').post(createProjectInput);
router.route('/input/delete/:id').delete(deleteInputArray);
router.route('/get/input/:category/:subcategory').get(getProjectAllSubInput);
router.route('/get/input-c/:category/:subcategory/:company_cate').get(getProjectInputC);
router.route('/get/input/:category/:subcategory/:company_cate/:com_sub_cate').get(getProjectInput);
router.route('/single/input/update/:id').put(updateSignalInput);
router.route('/single/input/delete/:id').put(deleteSignalInput);

 
router.route('/company/category/delete/:id').delete(deleteCompanyCategory);
router.route('/company/sub/delete/:id/:data').delete(deleteSubCompanyCategory);
// router.route('/update/choice').put(updateSubInputChoice);
// router.route('/update/:category/choice/:subcategory').get(getSubInputChoice);


module.exports = router;