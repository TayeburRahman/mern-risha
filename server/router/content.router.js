const { createContent, updateContent, deleteContent, getContent, getAllContent } = require("../controllers/content.controllers");
const { createSaveContent, getUserContent } = require("../controllers/saveContent.controllers");

 

const router = require("express").Router(); 
router.route('/create').post(createContent);  
router.route('/get/filter1/:category/:subcategory/:company_cate').get(getContent); 
router.route('/get/filter2/:category/:subcategory/:company_cate/:com_sub_cate').get(getContent); 
router.route('/get/all').get(getAllContent); 
 
router.route('/update/:id').put(updateContent); 
router.route('/delete/:id').delete(deleteContent);  

// save users content 
router.route('/create/savecontent').post(createSaveContent);  
router.route('/get/savecontent/:id/:email').get(getUserContent);  
 

module.exports = router;