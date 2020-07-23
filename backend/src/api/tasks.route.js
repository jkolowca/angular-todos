const Router = require("express").Router;
const TasksCtrl = require("./tasks.controller");

const router = new Router();

router
  .route("/")
  .get(TasksCtrl.apiGetTasks)
  .post(TasksCtrl.apiAddTask);
router
  .route("/:state")
  .get(TasksCtrl.apiGetTasksByState)
router
  .route("/count/:state")
  .get(TasksCtrl.apiGetTasksCount)
router
  .route("/task/:id")
  .get(TasksCtrl.apiGetTaskById)
  .put(TasksCtrl.apiUpdateTask)
  .delete(TasksCtrl.apiDeleteTask);

module.exports = router;
