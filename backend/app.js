const express = require("express");

const app= express();

const cookieParser= require("cookie-parser");

const bodyParser= require("body-parser");
const fileUpload= require("express-fileupload");

const errorMiddleware= require("./middleware/error");

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

//route imports

const service= require("./routes/sRoute");
const user= require("./routes/userRoute");

//const program= require("./routes/programRoute");

const program= require("./routes/programRoute");

app.use("/api/v1",service);

app.use("/api/v1",user);

app.use("/api/v1", program);


//middleware for error
app.use(errorMiddleware);


module.exports=app;