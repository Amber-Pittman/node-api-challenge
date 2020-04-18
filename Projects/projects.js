const express = require("express")

const projectsDb = require("../data/helpers/projectModel")

const router = express.Router()

// Create new project
router.post("/", (req, res, next) => {
    projectsDb.insert(req.body)
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(next)
})

// Read projects
router.get("/", (req, res, next) => {
    projectsDb.get(req.body)
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})

// Read individual project
router.get("/:id", (req, res, next) => {
    const { id } = req.params.id

    projectsDb.get(id)
        .then((project) => {
                res.status(200).json(project)
            })
        .catch(next)
})


router.get("/:id/actions", (req, res, next) => {
    const { id } = req.params

    projectsDb.getProjectActions(id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
})

router.put("/:id", (req, res, next) => {
    const { id } = req.params
    const updatedProject = req.body

    projectsDb.update(id, updatedProject)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)
})

router.delete("/:id", (req, res, next) => {
    projectsDb.remove(req.params.id)
        .then((count) => {
            res.status(200).json({
                message: "Project Deleted."
            })
        })
        .catch(next)
})

module.exports = router