const mongoose = require ("mongoose");

//database table for user signup data further which is used for user login.

const signupSchema = new mongoose.Schema({
    f_sno:{
        type:Number,
        required:true
    },
    f_userName:{
        type:String,
        required:true
    },
    f_Pwd:{
        type:String,
        required:true
    },

},{timestamps:true});

const User = mongoose.model("SIGNUP",signupSchema);
module.exports=User