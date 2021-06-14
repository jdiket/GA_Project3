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
module.exports = tasks