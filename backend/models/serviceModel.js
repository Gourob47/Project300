const mongoose= require("mongoose");

const serviceSchema= new  mongoose.Schema({
    name:{
        type:String,
        required: true,
        
    
      },
 
           /* identity:{
            type:Number,
            required:true
           
            
           },*/

           ratings:{
               type:Number,
               default:0,
           },

           images:[
             {
                 public_id:{
                     type:String,
                     required: true,
                 },
                 url:{
                     type:String,
                     required:true,
                 }
             }
           ],

           reviews:[
               {

                user:{
                    type: mongoose.Schema.ObjectId,
                    ref: "User",
                    required: true,
                },
                   name:{
                       type:String,
                       required: true,
                   },
                   rating:{
                       type:Number,
                       required:true,
                   },
                   comment:{
                       type:String,
                       required: true,
                   }
               }
           ],

           numofReviews:{
               type:Number,
               default:0,
           },

       

  
            category:{
                type:String,
                required:true
            },

            price:{
                type:Number,
                required:true
            },


            user:{
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },

            createdAt:{
                type:Date,
                default: Date.now,
            }




});

module.exports= new mongoose.model("Service",serviceSchema);

