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
let lists;
class ListsDAO {
    static injectDB(conn) {
        return __awaiter(this, void 0, void 0, function* () {
            if (lists) {
                return;
            }
            try {
                lists = conn.db("todo").collection("lists");
            }
            catch (e) {
                console.error(`Unable to establish a collection handle in listsDAO: ${e}`);
            }
        });
    }
    static getLists() {
        return __awaiter(this, void 0, void 0, function* () {
            let cursor;
            try {
                cursor = lists.find();
            }
            catch (e) {
                console.error(`Unable to issue find command, ${e}`);
                return { listsList: [] };
            }
            try {
                const listsList = yield cursor.toArray();
                return { listsList };
            }
            catch (e) {
                console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
                return { listsList: [] };
            }
        });
    }
    static getList(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(id);
                return yield lists.findOne({ _id: id });
            }
            catch (e) {
                console.error(`Something went wrong in getTaskByID: ${e}`);
                throw e;
            }
        });
    }
    static addList(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listDoc = { name };
                return yield lists.insertOne(listDoc);
            }
            catch (e) {
                console.error(`Unable to post list: ${e}`);
                return { error: e };
            }
        });
    }
    static deleteList(listId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteResponse = yield lists.deleteOne({
                    _id: listId,
                });
                return deleteResponse;
            }
            catch (e) {
                console.error(`Unable to delete list: ${e}`);
                return { error: e };
            }
        });
    }
}
/**
 * A List
 * @typedef List
 * @property {ObjectId} _id
 * @property {string} name
 */
exports.default = ListsDAO;
