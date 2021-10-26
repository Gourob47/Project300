const mongoose= require("mongoose");

const serviceSchema= new  mongoose.Schema({
    name:{
        type:String,
        required: true,
        
    
      },
 
     identity:{
            type:Number,
            required:true
           
            
           },

     email:{
            type:String,
            required:true
               
            },

     phone:{
                type:Number,
                required:true
               
               
            },

            createdAt:{
                type:Date,
                default: Date.now,
            }




});

module.exports= new mongoose.model("Service",serviceSchema);

