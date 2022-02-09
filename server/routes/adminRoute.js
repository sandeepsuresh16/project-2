const express = require("express")
const router = express.Router();
const ADMIN_CONTROLLER = require('../controller/adminController')
const auth = require('../middleware/auth')
const paginatedResult = require('../middleware/paginatedResultTeacher');
const markedAttendance = require('../middleware/attendanceMarked')
const TEACHER = require("../model/register_teacher");
const {CLASS} =  require('../model/register_class')
const STUDENT = require('../model/register_student')
const BOOK = require('../model/register_book')
const {ATTENDANCE_STAFF, ATTENDANCE_STUDENT} = require('../model/register_attendence')


//admin login
router.post('/login',(req,res)=>ADMIN_CONTROLLER.adminLogin(req,res))
//check admin is logged in
router.get('/loggedin',(req,res)=>ADMIN_CONTROLLER.loggedIn(req,res))
//admin logout
router.get('/logout',(req,res)=>ADMIN_CONTROLLER.logout(req,res))
//admin-home
router.get('/',auth,(req,res)=>ADMIN_CONTROLLER.adminHome(req,res))

//add new teacher
router.post('/addTeacher',auth,(req,res)=>ADMIN_CONTROLLER.addTeacher(req,res))
//get teachers
router.get('/teachers',auth,paginatedResult(TEACHER),(req,res)=>{
    res.status(200).json({data:res.paginatedResult})
})
//edit teacher
router.put('/teacher-edit',auth,(req,res)=>ADMIN_CONTROLLER.editTeacher(req,res))
//search teacher
router.get('/teacher-search',auth,(req,res)=>ADMIN_CONTROLLER.searchTeacher(req,res))


//add subject
router.post('/subject-add',(req,res)=>ADMIN_CONTROLLER.subjectAdd(req,res))
//assign subject to class
router.post('/subject/assign',auth,(req,res)=>ADMIN_CONTROLLER.subjectAssign(req,res))

//add class
router.post('/class-add',auth,(req,res)=>ADMIN_CONTROLLER.classAdd(req,res))
//edit class
router.put('/class-edit',auth,(req,res)=>ADMIN_CONTROLLER.classEdit(req,res))
//get Class
router.get('/class',auth,paginatedResult(CLASS),(req,res)=>{
    res.status(200).json({data:res.paginatedResult})
})


//add student
router.post('/student/add',auth,(req,res)=>ADMIN_CONTROLLER.studentAdd(req,res))
//get students list
router.get('/student',auth,paginatedResult(STUDENT),(req,res)=>{
    res.status(200).json({data:res.paginatedResult})
})
//search student
router.get('/student-search',auth,(req,res)=>ADMIN_CONTROLLER.studentSearch(req,res))
//edit student
router.put('/student-edit',auth,(req,res)=>ADMIN_CONTROLLER.studentEdit(req,res))
//get student promotion list
router.get('/student-promotionList',auth,paginatedResult(STUDENT),(req,res)=>{
    res.status(200).json({data:res.paginatedResult})
})
//promote student
router.put('/promote-student',auth,(req,res)=>ADMIN_CONTROLLER.studentPromote(req,res))


//get books
router.get('/book',auth,paginatedResult(BOOK),(req,res)=>{
    res.status(200).json({data:res.paginatedResult})
})
//add new book
router.post('/book-add',auth,(req,res)=>ADMIN_CONTROLLER.bookAdd(req,res))
//edit book
router.put('/book-edit',auth,(req,res)=>ADMIN_CONTROLLER.bookEdit(req,res))

// check if staff attendance is marked for today
router.get('/attendance-staff-marked',auth,markedAttendance(ATTENDANCE_STAFF))
// check if student attendance is marked for today
router.get('/attendance-student-marked',auth,markedAttendance(ATTENDANCE_STUDENT))
//mark staff attandance
router.post('/attendance-staff',auth,(req,res)=>ADMIN_CONTROLLER.staffAttandance(req,res))
//mark Student attendance
router.post('/attendance-student',auth,(req,res)=>ADMIN_CONTROLLER.studentAttandance(req,res))
//get date-wise attendace -staff
router.get('/attendance-staff',auth,(req,res)=>ADMIN_CONTROLLER.getStaffAttandeance(req,res))
//get date-wise attendance -student



module.exports = router;