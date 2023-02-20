 
const { createUsers, getUsers, getAllUsers, updateUsers, getSingleUsers } = require("../controllers/auth.controllers");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.route('/signup').post(createUsers);
router.route('/login').post(getUsers);
router.route('/all').get(getAllUsers);
router.route('/update').put(updateUsers);
router.route('/single/:email').get(getSingleUsers);

 

module.exports = router;