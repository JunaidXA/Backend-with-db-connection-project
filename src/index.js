import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from './app.js'

dotenv.config({
    path: "./.env"
})

connectDB()
    .then(() => {

        const randomPort = Math.floor(Math.random() * (65535 - 1000 + 1)) + 1000;

        app.listen(process.env.PORT || randomPort, () => {
            console.log(`Server is Running at Port: ${process.env.PORT || randomPort}`);
        })
    })
    .catch((err) => {
        console.log("Mongo DB Connection Failed !!!!", err);
        console.error(err.message || err);
    })