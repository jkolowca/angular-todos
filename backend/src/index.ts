import { app } from './server';
import { MongoClient } from 'mongodb';
const TasksDAO = require("./dao/tasksDAO");
const ListsDAO = require("./dao/listsDAO");

const port = 5000 || 8000;

MongoClient.connect(
   "mongodb://localhost:27017",
   // TODO: Connection Pooling
   // Set the poolSize to 50 connections.
   // TODO: Timeouts
   // Set the write timeout limit to 2500 milliseconds.
   { connectTimeoutMS: 2500, poolSize: 50, useNewUrlParser: true, useUnifiedTopology: true }
)
   .catch((err) => {
      console.error(err.stack);
      process.exit(1);
   })
   .then(async (client) => {
      await TasksDAO.injectDB(client);
      await ListsDAO.injectDB(client);
      app.listen(port, () => {
         console.log(`listening on port ${port}`);
      });
   });
