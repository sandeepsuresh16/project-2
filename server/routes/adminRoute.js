const express = require("express")
const router = express.Router();
const ADMIN_CONTROLLER = require('../controller/adminController')
const auth = require('../middleware/auth')
const paginatedResult = require('../middleware/paginatedResultTeacher');
const TEACHER = require("../model/register_teacher");
const {CLASS} =  require('../model/register_class')
const STUDENT = require('../model/register_student')


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


module.exports = router;