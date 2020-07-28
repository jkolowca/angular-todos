"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lists_controller_1 = require("./lists.controller");
const router = express_1.Router();
router
    .route("/")
    .get(lists_controller_1.default.apiGetLists)
    .post(lists_controller_1.default.apiAddList);
router
    .route("/list/:id")
    .delete(lists_controller_1.default.apiDeleteList)
    .get(lists_controller_1.default.apiGetList);
exports.default = router;
