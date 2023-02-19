 
/* Init Server  */
const express = require("express");
const cors = require("cors"); 
const connectDB = require("./connection/connectDB"); 
const mongoose = require('mongoose')
require("dotenv").config(); 
const port = process.env.PORT || 5000;
const app = express();

/* Set Middle wares  */
app.use(cors());
app.use(express.json());
 
// database connect
connectDB()


/* Use Routes  */
app.use('/api/v1/users', require("./router/auth.router"));
app.use('/api/v1/category', require("./router/category.router"));
app.use('/api/v1/subcategory', require("./router/subcategory.router"));
app.use('/api/v1/project', require("./router/project.router"));
app.use('/api/v1/content', require("./router/content.router"));
app.use('/uploads', express.static('./uploads'));


/* testing api  */
app.get("/", (req, res) => {
  res.send("Server is running");
});

 
app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});

module.exports = app;