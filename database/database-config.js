const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const URI = process.env.URI;


const connectionDB =  async() =>{
    console.log("Connecting to mongoDB..")
    try 
    {
        await mongoose.connect(URI, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });

        console.log("Connection successful! ")
    } catch (error) {
        console.log("Error in connection", error);
    }
};

module.exports = connectionDB;

