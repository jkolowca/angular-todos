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
let tasks;
class TasksDAO {
    static injectDB(conn) {
        return __awaiter(this, void 0, void 0, function* () {
            if (tasks) {
                return;
            }
            try {
                tasks = yield conn.db("todo").collection("tasks");
            }
            catch (e) {
                console.error(`Unable to establish a collection handle in tasksDAO: ${e}`);
            }
        });
    }
    static getTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            let cursor;
            try {
                cursor = yield tasks.find();
            }
            catch (e) {
                console.error(`Unable to issue find command, ${e}`);
                return { tasksList: [] };
            }
            try {
                const tasksList = yield cursor.toArray();
                return { tasksList };
            }
            catch (e) {
                console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
                return { tasksList: [] };
            }
        });
    }
    static getListTasksByState(taskState, listId) {
        return __awaiter(this, void 0, void 0, function* () {
            let cursor;
            try {
                cursor = yield tasks.find({ taskState, listId });
            }
            catch (e) {
                console.error(`Unable to issue find command, ${e}`);
                return { tasksList: [] };
            }
            try {
                const tasksList = yield cursor.toArray();
                return { tasksList };
            }
            catch (e) {
                console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
                return { tasksList: [] };
            }
        });
    }
    static getTasksByState(state) {
        return __awaiter(this, void 0, void 0, function* () {
            let cursor;
            try {
                cursor = yield tasks.find({ taskState: state });
            }
            catch (e) {
                console.error(`Unable to issue find command, ${e}`);
                return { tasksList: [] };
            }
            try {
                const tasksList = yield cursor.toArray();
                return { tasksList };
            }
            catch (e) {
                console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
                return { tasksList: [] };
            }
        });
    }
    static getListTasksCount(taskState, listId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield tasks.countDocuments({ taskState, listId });
            }
            catch (e) {
                console.error(`Unable to issue find command, ${e}`);
                return 0;
            }
        });
    }
    static getTaskByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(id);
                return yield tasks.findOne({ _id: id });
            }
            catch (e) {
                console.error(`Something went wrong in getTaskByID: ${e}`);
                throw e;
            }
        });
    }
    static addTask(listId, name, date, comment, taskState) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const taskDoc = { listId, name, date, comment, taskState };
                return yield tasks.insertOne(taskDoc);
            }
            catch (e) {
                console.error(`Unable to post task: ${e}`);
                return { error: e };
            }
        });
    }
    static updateTask(taskId, name, date, comment, taskState) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateResponse = yield tasks.updateOne({ _id: taskId }, { $set: { name, date, comment, taskState } });
                return updateResponse;
            }
            catch (e) {
                console.error(`Unable to update comment: ${e}`);
                return { error: e };
            }
        });
    }
    static deleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteResponse = yield tasks.deleteOne({
                    _id: taskId,
                });
                return deleteResponse;
            }
            catch (e) {
                console.error(`Unable to delete task: ${e}`);
                return { error: e };
            }
        });
    }
    static deleteListTasks(listId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteResponse = yield tasks.deleteMany({
                    listId
                });
                return deleteResponse;
            }
            catch (e) {
                console.error(`Unable to delete task: ${e}`);
                return { error: e };
            }
        });
    }
}
/**
 * A Task
 * @typedef Task
 * @property {ObjectId} _id
 * @property {string} name
 * @property {Date} date
 * @property {string} comment
 * @property {string} taskState
 */
exports.default = TasksDAO;
