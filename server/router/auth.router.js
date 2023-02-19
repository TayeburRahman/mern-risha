 
const { createUsers, getUsers, getAllUsers } = require("../controllers/auth.controllers");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.route('/signup').post(createUsers);
router.route('/login').post(getUsers);
router.route('/all').get(getAllUsers);
// router.route('/getByAllAuthor').get(verifyToken,getAllAdmin);

module.exports = router;