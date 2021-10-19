const app = require("./app");


const dotenv= require("dotenv");
const connectDatabase= require("./config/database");

//config

dotenv.config({path:"backend/config/config.env"});


//connect database
connectDatabase()

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port http://localhost:${process.env.PORT}`);
})