const express = require('express');
const cors = require('cors');

const app = express();


app.use(express.json());
app.use(cors());


const taskRoute = require("./router/TaskRoute");



app.use("/api", taskRoute);




module.exports = app;