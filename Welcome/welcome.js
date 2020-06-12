const express = require("express")
const router = express.Router()

router.get("/", (req, res, next) => {
    res.json({
        message: "Welcome to Amber's API!"
    })
    next()
})

module.exports = router