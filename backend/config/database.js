const mongoose= require("mongoose");



const connectDatabase=()=>{

    mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useUnifiedTopology: true}).then((data)=>{
        console.log(`Connection Successsful with: ${data.connection.host}`);
      })


}


/*const connectDatabase=()=>{

  mongoose.connect('mongodb+srv://Debnath:Debnath@cluster0.o7uxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology: true}).then((data)=>{
      console.log(`Connection Successsful with: ${data.connection.host}`);
    })


}*/


module.exports= connectDatabase


 
    