import { MongoClient, Collection, Cursor, ObjectId } from 'mongodb';
let tasks: Collection<any>;

class TasksDAO {
  static async injectDB(conn: MongoClient) {
    if (tasks) {
      return;
    }
    try {
      tasks = await conn.db("todo").collection("tasks");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in tasksDAO: ${e}`
      );
    }
  }

  static async getTasks() {
    let cursor: Cursor;
    try {
      cursor = await tasks.find();
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { tasksList: [] };
    }

    try {
      const tasksList = await cursor.toArray();

      return { tasksList };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { tasksList: [] };
    }
  }

  static async getListTasksByState(taskState, listId) {
    let cursor: Cursor;
    try {
      cursor = await tasks.find({taskState, listId});
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { tasksList: [] };
    }

    try {
      const tasksList = await cursor.toArray();

      return { tasksList };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { tasksList: [] };
    }
  }

  static async getTasksByState(state) {
    let cursor: Cursor;
    try {
      cursor = await tasks.find({taskState: state});
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { tasksList: [] };
    }

    try {
      const tasksList = await cursor.toArray();

      return { tasksList };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { tasksList: [] };
    }
  }

  static async getListTasksCount(taskState, listId) {
    try {
      return await tasks.countDocuments({taskState, listId});
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return 0;
    }
  }

  static async getTaskByID(id: ObjectId) {
    try {
      console.log(id);
      return await tasks.findOne({ _id: id});
    } catch (e) {
      console.error(`Something went wrong in getTaskByID: ${e}`);
      throw e;
    }
  }

  static async addTask( listId: ObjectId, name: string, date: Date, comment: string, taskState: string) {
    try {
      const taskDoc = { listId, name, date, comment, taskState };

      return await tasks.insertOne(taskDoc);
    } catch (e) {
      console.error(`Unable to post task: ${e}`);
      return { error: e };
    }
  }

  static async updateTask(taskId: ObjectId, name: string, date: Date, comment: string, taskState: string) {
    try {
      const updateResponse = await tasks.updateOne(
        { _id: taskId },
        { $set: { name, date, comment, taskState } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update comment: ${e}`);
      return { error: e };
    }
  }

  static async deleteTask(taskId: ObjectId) {

    try {
      const deleteResponse = await tasks.deleteOne({
        _id: taskId,
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete task: ${e}`);
      return { error: e };
    }
  }

  static async deleteListTasks(listId: ObjectId) {

    try {
      const deleteResponse = await tasks.deleteMany({
        listId
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete task: ${e}`);
      return { error: e };
    }
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

export default TasksDAO;