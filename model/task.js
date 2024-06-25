const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {type:String,required: true},
    description: String,
    subtasks: String,
    status: Boolean,
    toDate: Date,
    fromDate: Date
  });
  
const task = mongoose.model('Character', taskSchema);

module.exports = task;