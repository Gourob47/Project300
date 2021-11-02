const mongoose= require("mongoose");
const validator= require("validator");

const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");

const userSchema= new mongoose.Schema({
    name:{
        type:String, 
        required:[true,"Please Enter your name"],
        maxlength:[20,"Cannot exceed 20 word"],
        minlength:[4,"Cannot less then 4 word"]
    },

    email:{
      type:String,
      required:[true,"please enter your mail"],
      unique:true,
      validate:[validator.isEmail,"Please enter a valid Email"]

    },
    password:{

        type:String,
        required:[true,"please enter your password"],
        minlength:[8,"Password should must greater then 8 character"],
        select: false,
    },
    avatar:[
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

    role:{
        type:String,
        default:"User",
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});


//bcrypt Password
userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password= await bcrypt.hash(this.password,12);
})

//JWT Token

userSchema.methods.getJWTToken= function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
      expiresIn: process.env.JWT_EXPIRE,
    })
}

//Compare Password

userSchema.methods.comparePassword= async function(enteredPassword){

    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports= mongoose.model("User",userSchema);