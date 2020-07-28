import ListsDAO from '../dao/listsDAO';
import TasksDAO from '../dao/tasksDAO';
import {ObjectId} from 'mongodb';

class ListsController {
  static async apiGetLists(req, res, next) {
    const { listsList } = await ListsDAO.getLists();
    res.json(listsList);
  }

  static async apiGetList(req, res, next) {
    let id = req.params.id || {};
    try {
      const list = await ListsDAO.getList(new ObjectId(id));
      res.json(list);
    } catch (e) {
      res.status(500).json({e});
    }
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
      await ListsDAO.deleteList(new ObjectId(id));
      await TasksDAO.deleteListTasks(new ObjectId(id));
      const lists = await ListsDAO.getLists();
      res.json(lists);
    } catch (e) {
      res.status(500).json({ e });
    }
  }
}

export default ListsController;
