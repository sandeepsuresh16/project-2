const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true}, 
    phone:{type:Number,required:true},
    dob:{type:String,required:true},
    bloodGroup:{type:String},
    nameFather:{type:String,required:true},
    nameMother:{type:String,required:true},
    phoneFather:{type:Number,required:true}, 
    phoneMother:{type:Number,required:true},
    occupationFather:{type:String,required:true}, 
    occupationMother:{type:String,required:true}, 
    address:{type:String,required:true}, 
    pincode:{type:Number,required:true}, 
    admNumber:{type:Number,required:true,unique:true},
    admDate:{type:String,required:true},
    className:{type:String,required:true}, 
    division:{type:String,required:true,default:"A"},
    passwordHash:{type:String,required:true}
})

const STUDENT = mongoose.model("Student",studentSchema)

module.exports = STUDENT;