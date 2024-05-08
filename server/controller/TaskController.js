const task = require('../model/TaskModel');

const TaskController = {
  addTask: async (req, res) => {
    const { title, description } = req.body
    if (!title) {
      res.status(400).json({
        code: "400",
        message: "Please provide title",
        status: false,
        data: [],
        error: error,
      })
      return
    }
    if (!description) {
      res.status(400).json({
        code: "400",
        message: "Please provide description",
        status: false,
        data: [],
        error: error,
      })
      return
    }
    try {
      const taskData = {
        title,
        description,
        status: "PENDING",
        created_at: new Date().getTime()
      }
      const data = await task.create(taskData);
      if (data) {
        res.status(200).json({
          code: "201",
          message: "Record inserted Successfully",
          status: true,
          data: data,
          error: false,
        });
      }
    } catch (error) {
      res.status(500).json({
        code: "500",
        message: "Internal Server Error",
        status: false,
        data: [],
        error: error,
      })
    }
  },
  getTasks: async (req, res) => {
    try {
      const data = await task.find().sort({ created_at: -1 });
        res.status(200).json({
          code: "201",
          message: "Record Found",
          status: true,
          data: data,
          error: false,
        });
      
    } catch (error) {
      res.status(500).json({
        code: "500",
        message: "Internal Server Error",
        status: false,
        data: [],
        error: true,
      });
    }
  },
  getSingleTask: async (req, res) => {
    console.log(req.params.id);
    try {
      const taskId = req.params.id;
      const data = await task.findById(taskId);
      if (data) {
        res.status(201).json({
          code: "201",
          message: "Record Found!",
          status: true,
          data: data,
          error: false
        })
      } else {
        res.status(400).json({
          code: "400",
          message: "Record Not Found!",
          status: false,
          data: [],
          error: true
        })
      }

    } catch (error) {
      res.status(500).json({
        code: "500",
        message: "Internal Server Error",
        status: false,
        data: [],
        error: true
      })
    }
  },
  deleteSingleTask: async (req, res) => {
    try {
      const task_id = req.params.id;
      const data = await task.deleteOne({ _id: task_id });
      if (data.deletedCount > 0) {
        res.status(201).json({
          status: '201',
          message: "Record Deleted successfully",
          status: true,
          data: data,
          error: false
        })
      } else {
        res.status(400).json({
          status: '400',
          message: "Record Not Found!",
          status: false,
          data: [],
          error: true
        })
      }
    } catch (error) {
      res.status(500).json({
        status: "500",
        message: "Internal Server Error",
        data: [],
        status: false,
        error: true
      })
    }
  },
  updateTask: async (req, res) => {
    console.log(req.params);
    const task_id = req.params.id;
    const { title, description, status } = req.body
    try {
      const data = await task.updateOne({ _id: task_id }, {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status })
      });
      if (data.matchedCount > 0) {
        res.status(200).json({
          code: "201",
          message: "Record Update Successfully",
          status: true,
          data: data,
          error: false,
        });
      } else {
        res.status(404).json({
          code: "404",
          message: "Record Not Found",
          status: false,
          data: [],
          error: false,
        });
      }

    } catch (error) {
      res.status(500).json({
        status: "500",
        message: "Internal Server Error",
        status: false,
        data: [],
        error: true
      })
    }
  }

}


module.exports = TaskController;