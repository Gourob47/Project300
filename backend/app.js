const express = require("express");

const app= express();

const cookieParser= require("cookie-parser");

const errorMiddleware= require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

//route imports

const service= require("./routes/sRoute");
const user= require("./routes/userRoute");


app.use("/api/v1",service);

app.use("/api/v1",user);


//middleware for error
app.use(errorMiddleware);


module.exports=app;