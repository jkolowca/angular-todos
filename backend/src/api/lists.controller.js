const ListsDAO = require("../dao/listsDAO");
const TasksDAO = require("../dao/tasksDAO");
const ObjectId = require("mongodb").ObjectId;

class ListsController {
  static async apiGetLists(req, res, next) {
    const { listsList } = await ListsDAO.getLists();
    res.json(listsList);
  }

  static async apiAddList(req, res, next) {
    try {
      const { name } = req.body;

      await ListsDAO.addList(name);

      const updatedLists = await ListsDAO.getLists();

      res.json({ status: "success", lists: updatedLists });
    } catch (e) {
      res.status(500).json({ e });
    }
  }

  static async apiDeleteList(req, res, next) {
    try {
      let id = req.params.id || {};
      await ListsDAO.deleteList(ObjectId(id));
      await TasksDAO.deleteListTasks(ObjectId(id));
      const lists = await ListsDAO.getLists();
      res.json(lists);
    } catch (e) {
      res.status(500).json({ e });
    }
  }
}

module.exports = ListsController;
