const express = require('express');
const TaskController = require('../controller/TaskController');

const router = express.Router();



router.post('/tasks',TaskController.addTask);
router.get('/tasks',TaskController.getTasks);
router.get('/tasks/:id',TaskController.getSingleTask);
router.delete('/tasks/:id',TaskController.deleteSingleTask)
router.put('/tasks/:id',TaskController.updateTask);

module.exports = router;
