
const { generateToken } = require("../utils/token");
let bcrypt = require("bcryptjs");
const authModel = require("../models/auth.models");



//  response  
const createUsers = async (req, res) => {


  try {
    const newUser = req.body

    const ExistingUser = await authModel.findOne({
      email: req.body.email
    });

    if (ExistingUser) {

      return res.json({ status: "error", message: `${req.body.email} already exists` });
    }

    const user = await authModel.create(newUser)

    return res.status(200).json({
      user,
      status: "success",
      message: 'User register success'
    });

  } catch (error) {
    return res.status(500).json({ status: "error", message: error })
  }
}


/**
 1. Check if Email and password given
 2. Load user from database by email
 3. if not user send res Some message
 4. compare password
 5. if password not match send res Some message
 6. check if user is active
 7. if not active send res Some message
 8. generate token
 9. send user and token
 */

const getUsers = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(401).json({
        status: "error",
        message: "Email or ID and password are required"
      });
    }

    const user = await authModel.findOne({ $or: [{ email: email }, { userID: email }] })

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "User not found"
      });
    }


    const isMatchPassword = await bcrypt.compareSync(password, user.password);
    if (!isMatchPassword) {
      return res.status(401).json({
        status: "error",
        message: "Password not match"
      })
    }

    if (user.status != "active") {
      return res.status(401).json({
        status: "error",
        message: "User is not active"
      })
    }

    const token = generateToken(user)

    // IGNORE PASSWORD 
    const { password: pwd, ...others } = user.toObject();

    return res.status(200).send({
      status: "success",
      user: others,
      token,
      message: "User Login Successful"
    })
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages })
  }
}



const updateUsers = async (req, res) => {


  try {
    const { email,
      userID,
      fastname,
      lastname,
      familyName,
      username,
      info } = req.body


    const ExistingUser = await authModel.findOne({
      email
    });

    if (ExistingUser) {
      const request = await authModel.updateMany({ email }, { $set: { fastname, lastname, familyName, username, info } });


      return res.status(200).json({
        request,
        status: "success",
        message: 'User register success'
      });
    }

    return res.status(500).json({ status: "error", message: `Error, Please try again` });

  } catch (error) {
    return res.status(500).json({ status: "error", message: error })
  }
}



const getSingleUsers = async (req, res) => {
  try {
    const { email } = req.params 
 
    const user = await authModel.findOne({
      email
    });

    return res.status(201).send(user)
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages })
  }
}


const getAllUsers = async (req, res) => {
  try {
    const user = await authModel.find({})

    return res.status(201).send(user)
  } catch (error) {
    return res.status(401).json({ status: "error", message: error.massages })
  }
}


//   const updateUsers= async (req , res) => {

//   try {
//        await userModel.updateOne({
//          email: req.params.email
//         },
//           req.body
//       );
//       res.status(201).json({massages:'Card Updated Successfully'});
//   } catch (error) {
//       return res
//           .status(500).json({massages: error.massages}) 
//   }
// };




module.exports = { createUsers, getUsers, getAllUsers, updateUsers,getSingleUsers }