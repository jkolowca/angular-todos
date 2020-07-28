import { MongoClient, ObjectId } from 'mongodb';
declare class TasksDAO {
    static injectDB(conn: MongoClient): Promise<void>;
    static getTasks(): Promise<{
        tasksList: any[];
    }>;
    static getListTasksByState(taskState: any, listId: any): Promise<{
        tasksList: any[];
    }>;
    static getTasksByState(state: any): Promise<{
        tasksList: any[];
    }>;
    static getListTasksCount(taskState: any, listId: any): Promise<number>;
    static getTaskByID(id: ObjectId): Promise<any>;
    static addTask(listId: ObjectId, name: string, date: Date, comment: string, taskState: string): Promise<import("mongodb").InsertOneWriteOpResult<any> | {
        error: any;
    }>;
    static updateTask(taskId: ObjectId, name: string, date: Date, comment: string, taskState: string): Promise<import("mongodb").UpdateWriteOpResult | {
        error: any;
    }>;
    static deleteTask(taskId: ObjectId): Promise<import("mongodb").DeleteWriteOpResultObject | {
        error: any;
    }>;
    static deleteListTasks(listId: ObjectId): Promise<import("mongodb").DeleteWriteOpResultObject | {
        error: any;
    }>;
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
export default TasksDAO;
