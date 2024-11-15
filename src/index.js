//require('dotenv').config({ path: './env' })

import dotenv from "dotenv";
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
//import express from "express";
import connectDB from "./db/index.js";
import { app } from './app.js'


//const app = express();

dotenv.config({
    path: "./.env"
})



connectDB()
    .then(() => {

        const randomPort = Math.floor(Math.random() * (65535 - 1000 + 1)) + 1000;

        app.listen(process.env.PORT || randomPort, () => {
            console.log(`Server is Running at Port: ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("Mongo DB Connection Failed !!!!", err);
    })

// const app = express()
//     (async () => {
//         try {
//             await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//             app.on("error", () => {
//                 console.log("ERROR: ", error);
//                 throw error
//             })
//             app.listen(process.env.PORT, () => {
//                 console.log(`App is listning on port ${process.env.PORT}`);

//             })
//         } catch (error) {
//             console.log("Error:", error);
//             throw error
//         }
//     })() 
