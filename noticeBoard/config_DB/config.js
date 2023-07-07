const mongoose = require("mongoose");
// const dotenv = require("dotenv").config();

const dbConnect = async () =>
{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION);
        console.log("database connected", connect.connection.name, connect.connection.id);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }
}

module.exports= dbConnect