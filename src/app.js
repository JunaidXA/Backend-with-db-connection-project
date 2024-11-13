import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORGIN,
    credentials: true,
}))

app.use(express.json({ limit: "20kb" }))
app.use(express.urlencoded({ extended: true, limit: "20kb" }))
app.use(express.static("public"))
app.use(cookieParser())


// Import Routers

import userRouter from './routes/user.routes.js'


// Routes Decleration
app.use("/api/v1/users", userRouter)

export { app }