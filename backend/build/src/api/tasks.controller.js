"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasksDAO_1 = require("../dao/tasksDAO");
const mongodb_1 = require("mongodb");
class TasksController {
    static apiGetTasks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tasksList } = yield tasksDAO_1.default.getTasks();
            res.json(tasksList);
        });
    }
    static apiAddTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { listId, name, date, comment, taskState } = req.body;
                yield tasksDAO_1.default.addTask(new mongodb_1.ObjectId(listId), name, date, comment, taskState);
                const updatedTasks = yield tasksDAO_1.default.getTasks();
                res.json({ status: "success", tasks: updatedTasks });
            }
            catch (e) {
                res.status(500).json({ e });
            }
        });
    }
    static apiGetListTasksByState(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let state = req.params.state || {};
            let listId = req.params.id || {};
            const { tasksList } = yield tasksDAO_1.default.getListTasksByState(state, new mongodb_1.ObjectId(listId));
            res.json(tasksList);
        });
    }
    static apiGetTasksByState(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let state = req.params.state || {};
            const { tasksList } = yield tasksDAO_1.default.getTasksByState(state);
            res.json(tasksList);
        });
    }
    static apiGetListTasksCount(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let state = req.params.state || {};
            let listId = req.params.id || {};
            const count = yield tasksDAO_1.default.getListTasksCount(state, new mongodb_1.ObjectId(listId));
            res.json(count);
        });
    }
    static apiGetTaskById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id || {};
                let task = yield tasksDAO_1.default.getTaskByID(new mongodb_1.ObjectId(id));
                if (!task) {
                    res.status(404).json({ error: "Not found" });
                    return;
                }
                res.json(task);
            }
            catch (e) {
                console.log(`api, ${e}`);
                res.status(500).json({ error: e });
            }
        });
    }
    static apiUpdateTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id || {};
                const { name, date, comment, taskState } = req.body;
                const taskResponse = yield tasksDAO_1.default.updateTask(new mongodb_1.ObjectId(id), name, date, comment, taskState);
                if (taskResponse["error"]) {
                    res.status(400).json({ error: taskResponse["error"] });
                }
                if (taskResponse.modifiedCount === 0) {
                    throw new Error("unable to update task");
                }
                const tasks = yield tasksDAO_1.default.getTasks();
                res.json({ tasks });
            }
            catch (e) {
                res.status(500).json({ e });
            }
        });
    }
    static apiDeleteTask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id || {};
                yield tasksDAO_1.default.deleteTask(new mongodb_1.ObjectId(id));
                const tasks = yield tasksDAO_1.default.getTasks();
                res.json(tasks);
            }
            catch (e) {
                res.status(500).json({ e });
            }
        });
    }
}
exports.default = TasksController;
