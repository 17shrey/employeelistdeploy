const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({

    f_id:{
        type:Number,
        require:true
    },
    f_Image:{
        type:String,
        require:true
    },
    f_Name:{
        type:String,
        require:true,
        maxlength:50
    },
    f_Email:{
        type:String,
        require:true,
        maxlength:50
    },
    f_Mobile:{
        type:Number,
        require:true,
        maxlength:50
    },
    f_Designation:{
        type:String,
        require:true,
        maxlength:50
    },
    f_Gender:{
        type:String,
        require:true,
        maxlength:50
    },
    f_Course:{
        type:String,
        require:true,
        maxlength:50
    },
    f_Createdate:{ type: Date, default: Date.now }
},{timestamps:true});

const Employee = new mongoose.model("EMPLOYEE",employeeSchema);
module.exports=Employee;