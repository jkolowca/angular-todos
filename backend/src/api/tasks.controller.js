const TasksDAO = require("../dao/tasksDAO");
const ObjectId = require("mongodb").ObjectId;

class TasksController {
  static async apiGetTasks(req, res, next) {
    const { tasksList } = await TasksDAO.getTasks();
    res.json(tasksList);
  }

  static async apiAddTask(req, res, next) {
    try {
      const { name, date, comment, task_state } = req.body;

      await TasksDAO.addTask(name, date, comment, task_state);

      const updatedTasks = await TasksDAO.getTasks();

      res.json({ status: "success", tasks: updatedTasks });
    } catch (e) {
      res.status(500).json({ e });
    }
  }

  static async apiGetTasksByState(req, res, next) {
    let state = req.params.state || {};
    const { tasksList } = await TasksDAO.getTasksByState(state);
    res.json(tasksList);
  }

  static async apiGetTasksCount(req, res, next) {
    let state = req.params.state || {};
    const count = await TasksDAO.getTasksCount(state);
    res.json(count);
  }
  
  static async apiGetTaskById(req, res, next) {
    try {
      let id = req.params.id || {};
      let task = await TasksDAO.getTaskByID(ObjectId(id));
      if (!task) {
        res.status(404).json({ error: "Not found" });
        return;
      }

      res.json(task);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiUpdateTask(req, res, next) {
    try {
      let id = req.params.id || {};
      const { name, date, comment, task_state } = req.body;

      const taskResponse = await TasksDAO.updateTask(
        ObjectId(id),
        name,
        date,
        comment,
        task_state
      );

      var { error } = taskResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (taskResponse.modifiedCount === 0) {
        throw new Error("unable to update task");
      }

      const tasks = await TasksDAO.getTasks();

      res.json({ tasks });
    } catch (e) {
      res.status(500).json({ e });
    }
  }

  static async apiDeleteTask(req, res, next) {
    try {
      let id = req.params.id || {};
      await TasksDAO.deleteTask(ObjectId(id));

      const tasks = await TasksDAO.getTasks();
      res.json(tasks);
    } catch (e) {
      res.status(500).json({ e });
    }
  }
}

module.exports = TasksController;
