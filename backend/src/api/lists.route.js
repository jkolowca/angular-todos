const Router = require("express").Router;
const ListsCtrl = require("./lists.controller");

const router = new Router();

router
  .route("/")
  .get(ListsCtrl.apiGetLists)
  .post(ListsCtrl.apiAddList);
router
  .route("/list/:id")
  .delete(ListsCtrl.apiDeleteList)
  .get(ListsCtrl.apiGetList)

module.exports = router;
