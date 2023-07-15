const mongoose= require("mongoose");



const connectDatabase=()=>{

    mongoose.connect("mongodb://0.0.0.0:27017/Event", {useNewUrlParser:true, useUnifiedTopology: true}).then((data)=>{
        console.log(`Connection Successsful with: ${data.connection.host}`);
      })

}


// const connectDatabase=()=>{
//   mongoose.connect(process.env.DB_ATLAS, {useNewUrlParser:true, useUnifiedTopology: true}).then((data)=>{
//       console.log(`Connection Successsful with: ${data.connection.host}`);
//     })
// }


module.exports= connectDatabase


 
