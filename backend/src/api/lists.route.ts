import { Router } from 'express';
import ListsCtrl from './lists.controller';

const router = Router();

router
  .route("/")
  .get(ListsCtrl.apiGetLists)
  .post(ListsCtrl.apiAddList);
router
  .route("/list/:id")
  .delete(ListsCtrl.apiDeleteList)
  .get(ListsCtrl.apiGetList)

export default router;
