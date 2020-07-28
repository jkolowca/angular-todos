import {Router} from 'express';
import TasksCtrl from './tasks.controller';

const router = Router();

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

  export default router;