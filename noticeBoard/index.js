// console.log("kaniskaa")
const dbConnect = require("./config_DB/config");
const cors = require('cors');

const error = require("./errorHandler/handle_error")
const express = require("express");
//dynamically linking a port 
const dotenv = require("dotenv").config();
const port = process.env.PORT;
dbConnect();
const app = express();
app.use(cors()) 
app.use(express.json());
app.use("/api/notices", require("./configServer/config_server"));

app.use(error)

app.listen(port, ()=>
{
    console.log(`running in ${port}`);})