const express = require ("express");
app=express();
app.use(express.json());

//main file of server folder

require("./DBconnection/connection");
app.use(require("./Router/login"));
app.use(require("./Router/employee"));

