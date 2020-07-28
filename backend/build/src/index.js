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
const server_1 = require("./server");
const mongodb_1 = require("mongodb");
const TasksDAO = require("./dao/tasksDAO");
const ListsDAO = require("./dao/listsDAO");
const port = 5000 || 8000;
mongodb_1.MongoClient.connect("mongodb://localhost:27017", 
// TODO: Connection Pooling
// Set the poolSize to 50 connections.
// TODO: Timeouts
// Set the write timeout limit to 2500 milliseconds.
{ connectTimeoutMS: 2500, poolSize: 50, useNewUrlParser: true, useUnifiedTopology: true })
    .catch((err) => {
    console.error(err.stack);
    process.exit(1);
})
    .then((client) => __awaiter(void 0, void 0, void 0, function* () {
    yield TasksDAO.injectDB(client);
    yield ListsDAO.injectDB(client);
    server_1.app.listen(port, () => {
        console.log(`listening on port ${port}`);
    });
}));
