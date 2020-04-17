const express = require("express")

const projectsDb = require("../data/helpers/projectModel")

const router = express.Router()
router.use(express.json())

router.get("/", (req, res, next) => {
    projectsDb.insert(req.body)
        .then(projects => {
            res.status(201).json(projects)
        })
        .catch(next)
})