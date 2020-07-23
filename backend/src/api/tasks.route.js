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
  .route("/:state/:id")
  .get(TasksCtrl.apiGetListTasksByState)
router
  .route("/count/:state/:id")
  .get(TasksCtrl.apiGetListTasksCount)
router
  .route("/task/:id")
  .get(TasksCtrl.apiGetTaskById)
  .put(TasksCtrl.apiUpdateTask)
  .delete(TasksCtrl.apiDeleteTask);

module.exports = router;
