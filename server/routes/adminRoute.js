const express = require("express")
const router = express.Router();
const ADMIN_CONTROLLER = require('../controller/adminController')
const auth = require('../middleware/auth')

router.get('/',(req,res)=>res.status(200).json({msg:"Admin Route"}))

router.post('/login',(req,res)=>ADMIN_CONTROLLER.adminLogin(req,res))

router.get('/loggedin',auth,(req,res)=>ADMIN_CONTROLLER.loggedIn(req,res))

router.get('/logout',(req,res)=>ADMIN_CONTROLLER.logout(req,res))

// router.post('/addTeacher',auth)

module.exports = router;