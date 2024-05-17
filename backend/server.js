import express from 'express'
import connectDB from './db/connectDB.js'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import {v2 as cloudinary} from 'cloudinary'

connectDB()
const app = express()

const PORT = process.env.PORT || 5000;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// middlewares
app.use(express.json()) // to parse JSON data in req.body
app.use(express.urlencoded({extended: true})) // to parse form data in req.body
app.use(cookieParser())

// Routes
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)


app.listen(PORT, () => console.log(`server started at port ${PORT}`))