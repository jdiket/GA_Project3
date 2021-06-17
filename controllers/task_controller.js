const express = require('express')
const tasks = express.Router()
const Task = require('../models/task.js')

//Create Route
tasks.post('/', async (req, res) => {
    Task.create(req.body, (error, createdTask) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).send(createdTask) //  .json() will send proper headers in response so client knows it's json coming back
    })
})

//curl -X POST -H "Content-Type: application/json" -d '{"name":"world kindness"}' http://localhost:3003/tasks

//Index route
tasks.get('/', (req, res) => {
    Task.find({}, (err, foundTasks) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(foundTasks)
    })
})
//curl http://localhost:3003/tasks

// Show Route
tasks.get('/:id', (req, res) => {
    Task.findById(req.params.id, (err, foundTask) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(foundTask)
        // console.log(foundTask)
    })
})

//Delete Route
tasks.delete('/:id', (req, res) => {
    Task.findByIdAndRemove(req.params.id, (err, deletedTask) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(deletedTask)
    })
})
//curl -X DELETE http://localhost:3003/tasks/5cc738d41f84cd0a2e1225bb

// Update Sub-Task
tasks.put('/:id/update', (req, res) => {
    // Task.findByIdAndUpdate(req.params.id, {$push: { subTask: newSubTask } }, { new: true }, (err, updatedTask) => {
    //     if (err) {
    //         res.status(400).json({ error: err.message })
    //     }
    //     res.status(200).json(updatedTask)
    // })
    console.log('id: ' + req.params.id)
    const newSubTask = { name: req.body.name, description: req.body.description }
    console.log(newSubTask)
    Task.updateOne( { _id: req.params.id }, {$push: { subTask: newSubTask } }, { new: true }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    })
    Task.findById(req.params.id, (err, foundTask) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(foundTask)
        console.log(foundTask)
    })
})

// Update Route
tasks.put('/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedTask) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(updatedTask)
    })
})

module.exports = tasks