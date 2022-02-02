const mongoose = require("mongoose")


const classSchema = new mongoose.Schema({
    className:{type:String,required:true},
    division:{type:String, default:"A"},
    classTeacher:{type:String},
    subjects:{type:Array,default:[]}
})

const CLASS = mongoose.model("Class",classSchema)


const subjectSchema = new mongoose.Schema({
    subject:{type:String,required:true,unique:true},
    shortForm:{type:String,unique:true}
})

const SUBJECT = mongoose.model("Subject",subjectSchema);

module.exports={CLASS,SUBJECT};