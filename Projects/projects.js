const express = require("express")

const projectsDb = require("../data/helpers/projectModel")
const actionsDb = require("../data/helpers/actionModel")

const router = express.Router()


// Read projects
router.get("/", (req, res, next) => {
    console.log("req.query", req.query)
    projectsDb
        .get()
        .then(projects => {
            console.log(projects)
            res.status(200).json(projects)
        })
        .catch(next)
})

// Create new project
router.post("/", validateProject(), (req, res, next) => {
    projectsDb
        .insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

// Create new project action
router.post("/:id/actions", validateProjectId(), validateAction(), (req, res, next) => {
    const { description, notes } = req.body
    const { id: project_id } = req.params

    actionsDb
        .insert({description, notes, project_id})
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
})

// Read individual project
router.get("/:id", validateProjectId(), (req, res, next) => {
    res.status(200).json(req.project)
    next()
})


router.get("/:id/actions", validateProjectId(), (req, res, next) => {
    projectsDb
        .getProjectActions(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
})

router.put("/:id", validateProjectId(), validateProject(), (req, res, next) => {
    projectsDb
        .update(req.params.id, req.body)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)
})

router.delete("/:id", validateProjectId(), (req, res, next) => {
    projectsDb
        .remove(req.params.id)
        .then(count => {
            res.status(200).json({
                message: "Project Deleted."
            })
        })
        .catch(next)
})

function validateProject(req, res, next) {
    return (req, res, next) => {
        if (!req.body.name) {
            return res.status(400).json({
                error: "Missing Project's Name"
            })
        } else if (!req.body.description) {
            return res.status(400).json({
                error: "Missing Project's Description"
            })
        }

    next()
    
    } 
}

function validateProjectId(req, res, next) {
    return (req, res, next) => {
        projectsDb
            .get(req.params.id)
            .then(project => {
                if (project) {
                    req.project = project
                    next()
                } else {
                    res.status(404).json({
                        errorMessage: "Cannot validate Project ID"
                    })
                }
            })
            .catch(next) 
    }
}

function validateAction(req, res, next) {
    return (req, res, next) => {
        if (!req.body.description) {
            return res.status(400).json({
                message:"Missing the Action Description Data"
            })
    } else if (!req.body.notes) {
        return res.status(400).json({
            message: "Missing the Action Notes information"
        })
    }
        next()
    }
}

module.exports = router