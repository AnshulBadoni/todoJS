const express = require('express');
const router = express.Router();
const task = require("../../model/task");

router.route('/task/:id')

.get(async(req,res)=>{
    const id = req.params.id;
    task.findById(id)
        .then((foundTask) => {
            res.send(foundTask);
        })
        .catch((err)=>{
            res.send(err);
        });
})

.patch(async(req,res)=>{
    const id = req.params.id;
    const {title,description,subtasks,status,toDate,fromDate} = req.body;
    task.findById(id)
        .then((foundTask) => {
            foundTask.title = title;
            foundTask.description = description;
            foundTask.subtasks = subtasks;
            foundTask.status = status;
            foundTask.toDate = toDate;
            foundTask.fromDate = fromDate;
            foundTask.save();
            res.send(foundTask);
        })
        .catch((err)=>{ 
            res.send(err);
        });
})

.delete(async(req,res)=>{
    const id = req.params.id;
    task.findByIdAndDelete(id)
        .then((foundTask) => {
            res.send(foundTask);
        })
        .catch((err)=>{ 
            res.send(err);
        });
});

module.exports = router