const express = require('express');
const router = express.Router();
const task = require("../../model/task");

// const taskInterface = require("../../interface/taskInterface");
////////////////get all task///////////////////

router.route('/task')

.get(async(req,res)=>{
    const page = req.query.page;
    const limit = req.query.limit;
    const count = await task.countDocuments();
    if(page && limit){
    task.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .then((foundTask) => {
          res.send({ tasks: foundTask, total: count });
        })
        .catch((err)=>{
            res.send(err);
        });
      }
      else {
        task.find()
        .then((foundTask) =>{
          res.send({ tasks: foundTask, total: count });
        })
      }
    })
///////////////get a single task////////////////

.post(async(req, res) => {
    try {
    const { title, description, subtasks, status, fromDate, toDate } = req.body;
    const newTask = new task({
      title,
      description,
      subtasks,
      status,
      fromDate,
      toDate
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Error saving task:', err);
    if (err.name === 'ValidationError') {
      const errors = Object.keys(err.errors).map(key => err.errors[key].message);
      return res.status(400).json({ errors });
    }
    res.status(500).json({ error: 'Failed to save task' });
  }
})

.delete(async(req,res)=>{
    task.deleteMany()
        .then((deletedTask) => {
            res.send(deletedTask);
        })
        .catch((err)=>{
            res.send(err);
        });
})

module.exports = router