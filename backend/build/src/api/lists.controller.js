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
const listsDAO_1 = require("../dao/listsDAO");
const tasksDAO_1 = require("../dao/tasksDAO");
const mongodb_1 = require("mongodb");
class ListsController {
    static apiGetLists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { listsList } = yield listsDAO_1.default.getLists();
            res.json(listsList);
        });
    }
    static apiGetList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id || {};
            try {
                const list = yield listsDAO_1.default.getList(new mongodb_1.ObjectId(id));
                res.json(list);
            }
            catch (e) {
                res.status(500).json({ e });
            }
        });
    }
    static apiAddList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                yield listsDAO_1.default.addList(name);
                const updatedLists = yield listsDAO_1.default.getLists();
                res.json({ status: "success", lists: updatedLists });
            }
            catch (e) {
                res.status(500).json({ e });
            }
        });
    }
    static apiDeleteList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id || {};
                yield listsDAO_1.default.deleteList(new mongodb_1.ObjectId(id));
                yield tasksDAO_1.default.deleteListTasks(new mongodb_1.ObjectId(id));
                const lists = yield listsDAO_1.default.getLists();
                res.json(lists);
            }
            catch (e) {
                res.status(500).json({ e });
            }
        });
    }
}
exports.default = ListsController;
