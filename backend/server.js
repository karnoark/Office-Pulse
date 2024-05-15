import express from 'express'
import connectDB from './db/connectDB.js'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'

connectDB()
const app = express()

const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// Routes
app.use("/api/users", userRoutes)


app.listen(PORT, () => console.log(`server started at port ${PORT}`))