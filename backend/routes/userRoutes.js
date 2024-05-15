import express from "express"

const router = express.Router()

router.get("/signup", (req,res) => {
    console.log("got the request", req)
    res.send("signed up successfully")
})

export default router;