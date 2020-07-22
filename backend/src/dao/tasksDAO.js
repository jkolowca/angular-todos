let tasks;

class TasksDAO {
  static async injectDB(conn) {
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
    let cursor;
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

  static async getTasksByState(state) {
    let cursor;
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

  static async getTaskByID(id) {
    try {
      console.log(id);
      return await tasks.findOne({ _id: id});
    } catch (e) {
      console.error(`Something went wrong in getTaskByID: ${e}`);
      throw e;
    }
  }

  static async addTask( name, date, comment, taskState) {
    try {
      // TODO Ticket: Create/Update Comments
      // Construct the comment document to be inserted into MongoDB.
      const taskDoc = { name, date, comment, taskState };

      return await tasks.insertOne(taskDoc);
    } catch (e) {
      console.error(`Unable to post task: ${e}`);
      return { error: e };
    }
  }

  static async updateTask(taskId, name, date, comment, taskState) {
    try {
      // TODO Ticket: Create/Update Comments
      // Use the commentId and userEmail to select the proper comment, then
      // update the "text" and "date" fields of the selected comment.
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

  static async deleteTask(taskId) {
    /**
  Ticket: Delete Comments

  Implement the deleteOne() call in this method.

  Ensure the delete operation is limited so only the user can delete their own
  comments, but not anyone else's comments.
  */

    try {
      // TODO Ticket: Delete Comments
      // Use the userEmail and commentId to delete the proper comment.
      const deleteResponse = await tasks.deleteOne({
        _id: taskId,
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

/**
 * Result set for getTasks method
 * @typedef GetTasksResult
 * @property {Task[]} tasksList
 * @property {number} totalNumResults
 */

module.exports = TasksDAO;
