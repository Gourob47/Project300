const mongoose= require("mongoose");

const serviceSchema=  mongoose.Schema({
    name:{
        type:String,
        required: true,
        
    
      },
 
        identity:{
            type:Number,
            required:[6,"Enter correct number"],
           
            
           },

            email:{
                type:String,
                required:[true,"enter valid email"],
               
            },

            phone:{
                type:Number,
                required:[11,"enter valid number"],
               
               
            },

            createdAt:{
                type:Date,
                default: Date.now,
            }




});

module.exports=  mongoose.model("Service",serviceSchema);

