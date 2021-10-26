const app = require("./app");


const dotenv= require("dotenv");
const connectDatabase= require("./config/database");


//uncaughtError

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to UncaughtError Exception`);
    process.exit(1);
})



//config

dotenv.config({path:"backend/config/config.env"});


//connect database
connectDatabase()

const server=app.listen(process.env.PORT,()=>{
    console.log(`server is running on port http://localhost:${process.env.PORT}`);
})

//unhandledpromise rejection

process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
    process.exit(1);
    });
  });