import express = require('express');
import cors = require('cors');
import morgan = require('morgan');
import tasks from '../src/api/tasks.route';
import lists from '../src/api/lists.route';

export const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register api routes
app.use("/api/tasks", tasks);
app.use("/api/lists", lists);
app.use("/status", express.static("build"));
app.use("/", express.static("build"));
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

module.exports = app;
