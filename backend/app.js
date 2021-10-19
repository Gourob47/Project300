const express = require("express");

const app= express();

app.use(express.json());

//route imports

const service= require("./routes/sRoute");
app.use("/api/v1",service);


module.exports=app;