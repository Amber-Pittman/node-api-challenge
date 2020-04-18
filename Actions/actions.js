const express = require("express")

const actionsRouter = require("../data/helpers/actionModel")

const router = express.Router();

router.post("/", (req, res) => {
    const newAction = req.body

    actionsRouter.insert(newAction)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(error => {
            console.log(error);
            res.status(404).json({
                error: "Post action could not be added."
            })
        })
})

router.get("/", (req, res) => {
    actionsRouter.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            console.log(error)
            res.status(404).json({
                error: "Get action could not be found."
            })
        })
})

router.get("/:id", (req, res) => {
    const { id } = req.params

    actionsRouter.get(id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            console.log(error)
            res.status(404).json({
                error: "ID action not found."
            })
        })
})

router.put("/:id", (req, res) => {
    const { id } = req.params

    actionsRouter.update(id, req.body)
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(error => {
            console.log(error)
            res.status(404).json({
                error: "Put action could not update."
            })
        })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params

    actionsRouter.remove(id)
        .then(deleted => {
            console.log(deleted)
            res.status(204).json({
                message: "Action was deleted"
            })
        })
        .catch(error => {
            console.log(error)
            res.status(404).json({
                error: "Delete action not deleted."
            })
        })
})

module.exports = router