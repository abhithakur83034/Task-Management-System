const mongoose = require('mongoose');
const taskSchema = require('../migration/TaskSchema.json');
const TaskSchema = new mongoose.Schema(taskSchema);
module.exports = mongoose.model("tasks",TaskSchema)