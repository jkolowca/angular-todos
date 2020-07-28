"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_controller_1 = require("./tasks.controller");
const router = express_1.Router();
router
    .route("/")
    .get(tasks_controller_1.default.apiGetTasks)
    .post(tasks_controller_1.default.apiAddTask);
router
    .route("/:state")
    .get(tasks_controller_1.default.apiGetTasksByState);
router
    .route("/:state/:id")
    .get(tasks_controller_1.default.apiGetListTasksByState);
router
    .route("/count/:state/:id")
    .get(tasks_controller_1.default.apiGetListTasksCount);
router
    .route("/task/:id")
    .get(tasks_controller_1.default.apiGetTaskById)
    .put(tasks_controller_1.default.apiUpdateTask)
    .delete(tasks_controller_1.default.apiDeleteTask);
exports.default = router;
