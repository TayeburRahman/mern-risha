 
 
const { createProject, getSingleProject, getAllProjectAdmin, getSingleProjectAdmin, getUserAllProject, getUserCategoryProject, deleteUserCategoryProject, getSingleProjectC } = require("../controllers/project.controllers");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.route('/create').post(createProject);
router.route('/get').get(getAllProjectAdmin);
router.route('/single/:category/:subcategory/:company_cate/:user_email').get(getSingleProjectC);
router.route('/single/:category/:subcategory/:company_cate/:com_sub_cate/:user_email').get(getSingleProject);
router.route('/single/:id').get(getSingleProjectAdmin);
router.route('/user/:email').get(getUserAllProject);
router.route('/user/category/:category/:subcategory/:email').get(getUserCategoryProject);

router.route('/user/delete/:id').delete(deleteUserCategoryProject);

deleteUserCategoryProject

 

 

module.exports = router;