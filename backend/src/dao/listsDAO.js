let lists;

class ListsDAO {
  static async injectDB(conn) {
    if (lists) {
      return;
    }
    try {
      lists = await conn.db("todo").collection("lists");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in listsDAO: ${e}`
      );
    }
  }

  static async getLists() {
    let cursor;
    try {
      cursor = await lists.find();
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { listsList: [] };
    }

    try {
      const listsList = await cursor.toArray();

      return { listsList };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { listsList: [] };
    }
  }

  static async getList(id) {
    try {
      console.log(id);
      return await lists.findOne({ _id: id});
    } catch (e) {
      console.error(`Something went wrong in getTaskByID: ${e}`);
      throw e;
    }
  }

  static async addList(name) {
    try {
      const listDoc = { name };

      return await lists.insertOne(listDoc);
    } catch (e) {
      console.error(`Unable to post list: ${e}`);
      return { error: e };
    }
  }

  static async deleteList(listId) {
    try {
      const deleteResponse = await lists.deleteOne({
        _id: listId,
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete list: ${e}`);
      return { error: e };
    }
  }
}

/**
 * A List
 * @typedef List
 * @property {ObjectId} _id
 * @property {string} name
 */

module.exports = ListsDAO;
