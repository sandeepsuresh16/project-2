const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String, required:true, unique:true},
    dob:{type:String,required:true},
    phone:{type:Number, required:true},
    section:{type:String,required:true},
    salary:{type:Number,required:true},
    address:{type:String,required:true,minlength:10},
    passwordHash:{type:String,required:true},
    role:{type:String,default:"teacher"}

});

const TEACHER = new mongoose.model("Teacher",schema);

module.exports = TEACHER;