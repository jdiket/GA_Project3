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

  
      
module.exports = tasks