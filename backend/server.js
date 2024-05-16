import express from 'express'
import connectDB from './db/connectDB.js'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'

connectDB()
const app = express()

const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json()) // to parse JSON data in req.body
app.use(express.urlencoded({extended: true})) // to parse form data in req.body
app.use(cookieParser())

// Routes
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)


app.listen(PORT, () => console.log(`server started at port ${PORT}`))