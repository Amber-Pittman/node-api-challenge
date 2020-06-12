const express = require("express")

const actionsRouter = require("../data/helpers/actionModel")

const router = express.Router();

router.get("/", (req, res, next) => {
    console.log("req.query", req.query)
    actionsRouter
        .get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
})

router.get("/:id", validateActionId(), (req, res, next) => {
   res.status(200).json(req.action)
   next()
})

router.put("/:id", validateAction(), validateActionId(), (req, res, next) => {
    actionsRouter
        .update(req.params.id, req.body)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(next)
})

router.delete("/:id", validateActionId(), (req, res, next) => {
    actionsRouter
        .remove(req.params.id)
        .then(deleted => {
            console.log(deleted)
            res.status(204).json({
                message: "Action was deleted"
            })
        })
        .catch(next)
})

function validateActionId(req, res, next) {
    return (req, res, next) => {
        actionsRouter
            .get(req.params.id)
            .then(action => {
                if (action) {
                    req.action = action
                    next()
                } else {
                    res.status(404).json({
                        errorMessage: "Cannot validate Action ID"
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
                message: "Missing Action Description Information"
            })
        }
        next()
    }
}

module.exports = router