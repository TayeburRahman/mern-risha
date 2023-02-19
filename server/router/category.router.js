 
 
const { createCategory, getAllCategory, signalCategory, createSubCategory, signalSubCategory, updateSignalCategory, deleteSignalCategory, updateSignalSubCategory, deleteSignalSubCategory } = require("../controllers/category.controllers");
const upload = require("../middleware/uploadImage");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.route('/create').post( 
upload.single("avatar"),
createCategory);

router.route('/all').get(getAllCategory);
router.route('/signal/:id').get(signalCategory); 
router.route('/update/:id').put(updateSignalCategory); 
router.route('/delete/:id').delete(deleteSignalCategory); 
router.route('/subcategory/:tittle').get(signalSubCategory); 
router.route('/subcategory/update/:id/:tittle').put(updateSignalSubCategory);  
router.route('/subcategory/delete/:id/:tittle').delete(deleteSignalSubCategory); 
 


 


router.route('/sub/create/:id').post( 
    upload.single("avatar"),
    createSubCategory);

module.exports = router;