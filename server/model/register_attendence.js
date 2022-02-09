const mongoose = require('mongoose')

const staffAttendanceSchema = new mongoose.Schema({
    date:{type:String,required:true},
    absent:{type:Array}
},{timestamps:true})

const ATTENDANCE_STAFF = mongoose.model("Staffattendance",staffAttendanceSchema);


const studentAttendance = new mongoose.Schema({
    date:{type:String,required:true},
    className:{type:String},
    division:{type:String},
    absent:{type:Array}
},{timestamps:true})

const ATTENDANCE_STUDENT = mongoose.model("Studentattendance",studentAttendance)

module.exports = {ATTENDANCE_STAFF,ATTENDANCE_STUDENT}


