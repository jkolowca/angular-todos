const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const tasks = require('../src/api/tasks.route');
const lists = require('../src/api/lists.route');

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Register api routes
app.use("/api/tasks", tasks);
app.use("/api/lists", lists);
app.use("/status", express.static("build"));
app.use("/", express.static("build"));
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

module.exports = app;