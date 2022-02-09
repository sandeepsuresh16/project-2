const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const TEACHER = require('../model/register_teacher')
const bcrypt = require('bcryptjs')
const {SUBJECT,CLASS} = require('../model/register_class')
const {ATTENDANCE_STUDENT,ATTENDANCE_STAFF} = require('../model/register_attendence')
let ObjectId = require('mongoose').Types.ObjectId
const STUDENT = require('../model/register_student')
const BOOK = require('../model/register_book')
const STUDENT_HELPER = require('../helper/student_helper')
const TEACHER_HELPER = require('../helper/teacher_helper')
const VALIDATE_HELPER = require('../helper/validator')
const ATTENDANCE_MARKED_HELPER = require('../helper/attendance_helper')
const DATE = require('../helper/formatDate_helper')


dotenv.config();

module.exports = {

    adminLogin : (req,res)=>{
        const {username, password} = req.body
        const adminUser = "admin@gmail.com";
        const adminPassword = process.env.ADMIN_PASSWORD

        if(!username || !password){
            res.status(401).json({errMsg:"Please enter all fields"})
        }
        
        if(username!==adminUser || password!==adminPassword){
            res.status(401).json({errMsg:"Invalid login credential"})
        }

        //create JWT
        const token = jwt.sign({
            user:"admin"
        },process.env.JWT_SECRET)

        //send the http only cookie
        res.status(200).cookie("token",token,{
            httpOnly:true
        }).json({success:true})

        console.log('Admin logged IN')

    //     //create token
    //  const token = jwt.sign({
    //     user:'admin'
    //     },process.env.JWT_SECRET)
    
    // //send the http-only cookie
    // res.cookie("token",token,{
    //     httpOnly:true
    // }).send()
    // console.log('Admin logged in')
    },

    loggedIn :(req,res)=>{
        try{
            console.log('1')
            const token = req.cookies.token
            if(!token){
                console.log('1.1')
                return res.status(200).json(false)
            }
            
            const verified = jwt.verify(token,process.env.JWT_SECRET)
            if(verified){
                console.log('1.2')
                if(verified.user=="admin")
                   return res.status(200).json(true)
                else   
                   return res.status(200).json(false) 
            }else
                return res.status(200).json(false)

        }catch(err){
            console.log(err)
            res.json(false)
        }
        
        
    },

    logout: (req,res)=>{
        try{
            res.cookie("token",'',{
                httpOnly:true,
                expires:new Date(0)
            }).send()
        }catch(err){
            console.log(err)
            res.status(401).json({errorMessage:"error"})
        }
        
    },

    addTeacher: async(req,res)=>{
        const {name,qualification, email, address, phone, section, dob, salary, password} = req.body;

        if(!name || !phone || !email || !password || !dob || !address || !section || !qualification ||! salary){
            return res.status(400).json({errorMessage:"Please fill all details"})
        }

        if(!VALIDATE_HELPER.phoneValidate(phone)){
            return res.status(400).json({errorMessage:"invalid phone number"})
        }

        if(address.length < 10){
            return res.status(400).json({errorMessage:"Address-Minumum 10 characters"})
        }

        if(password.length < 4){
            return res.status(400).json({errorMessage:"minimum password length - 4"})
        }

        if(!VALIDATE_HELPER.emailValidate(email))
            return res.status(400).json({errorMessage:"invalid email"})    

        const existing = await TEACHER.findOne({email})
        if(existing)
            return res.status(400).json({errorMessage:"email-already existing"})


        let salt = await bcrypt.genSalt();
        let passwordHash = await bcrypt.hash(password,salt)

        const teacher = new TEACHER({
            name,email, passwordHash, dob,salary,address,section,qualification,phone
        })

        const newTeacher = await teacher.save();

        res.json({message:"success",data:newTeacher}).status(200)
        

    },

    adminHome: (req,res)=>{
        try{
            res.status(200).json({data:"Hello Admin! Welcome Home"})
        }catch(err){
            console.log(err)
            res.status(500).json({errorMessage:"internal error"})
        }
    },

    editTeacher: async(req,res)=>{
        try{
            const {name,phone,address,salary,qualification,section,email} = req.body;

            if(!name || !phone || !address || !salary || !qualification || !section){
                return res.json({errorMessage:"All fields are required"})
            }

            if(phone.length !=10){
                return res.status(400).json({errorMessage:"invalid phone number"})
            }
    
            if(address.length < 10){
                return res.status(400).json({errorMessage:"Address-Minumum 10 characters"})
            }

            await TEACHER.updateOne({email},{name,phone,address,salary,qualification,section})

            res.json({success:true}).status(200)
        }catch(e){
            console.log(e)
            res.status(500).json({errorMessage:"error"})
        }
    },

    searchTeacher: async(req,res)=>{
        let result = await TEACHER_HELPER.searchTeacher(req.query.search)
        if(result.query)
            res.status(200).json({success:true,data:result.data})
        else
            res.status(400).json({success:false})
        
    },

    subjectAdd: async(req,res)=>{
        try{
            const {subject,shortForm} = req.body
            if(!subject || !shortForm){
                return res.status(400).json({errorMessage:"Please fill all fields"})
            }
            const existingSubject = await SUBJECT.findOne({subject})
            if(existingSubject){
                return res.status(400).json({errorMessage:"Subject already exists"})
            }

            const existingShortForm = await SUBJECT.findOne({shortForm})
            if(existingShortForm){
                return res.status(400).json({errorMessage:"ShortForm already exists"})
            }

            const newSubject = new SUBJECT({
                subject:subject.toLowerCase(),
                shortForm:shortForm.toUpperCase()
            })
            
            const addedSub = await newSubject.save()
            res.status(200).json({success:true,data:addedSub})

        }catch(err){
            console.log(err)
            res.status(500).json({errorMessage:"error"})
        }
    },

    classAdd: async(req,res)=>{
        try {
            const {className,division,classTeacher} = req.body
            if(!className || !division || !classTeacher){
                return res.status(400).json({errorMessage:"Please fill all details"})
            }
            const existingClass = await CLASS.findOne({className,division:division.toUpperCase()})
            if(existingClass){
                return res.status(400).json({errorMessage:"This class already exists"})
            }
            const newClass = new CLASS({
                className,
                division:division.toUpperCase(),
                classTeacher
            })
            const addedClass = await newClass.save();
            res.status(200).json({success:true,data:addedClass})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({errorMessage:"error"})
        }

    },
    
    classEdit:async(req,res)=>{
        try {
            const {id,className,division,classTeacher} = req.body;
            if(!className || !division || !classTeacher){
                return res.status(400).json({errorMessage:"Please fill all details"})
            }

            await CLASS.updateOne({_id:ObjectId(id)},{className,division:division.toUpperCase(),classTeacher})
            res.status(200).json({success:true})
        } catch (error) {
            console.log(err)
            res.status(500).json({errorMessage:"error"})
        }
    },


    //assign subjects to classes
    subjectAssign: async (req,res)=>{
        try {
            const {id,subject1,subject2,subject3,subject4,subject5} = req.body
            if(!subject1 || !subject2 || !subject3 || !subject4 || !subject5)
                return res.status(400).json({errorMessage:"Please select all subjects"})
            
            await CLASS.updateOne({_id:ObjectId(id)},{subjects:[subject1,subject2,subject3,subject4,subject5]});
            res.status(200).json({success:true})
        } catch (error) {
            console.log(err)
            res.status(500).json({errorMessage:"error"})
        }
    },

    studentAdd: async(req,res)=>{
        try {
            const {firstName, lastName, email, phone,dob,bloodGroup,nameFather,nameMother,phoneFather, phoneMother,occupationFather, occupationMother, address, pincode, admNumber,admDate,className, division} = req.body

            if(!firstName||!lastName||!email||!phone||!dob||!nameFather||!nameMother||!address||!admNumber||!pincode||!className||!admDate||!phoneMother||!phoneFather||!bloodGroup||!occupationFather||!occupationMother||!division)
                return res.status(400).json({errorMessage:"Please fill all mandatory fields"})

            // if(phone.toString().length!=10 || phoneFather.toString().length!=10 || phoneMother.toString().length!=10)
            //     return res.status(400).json({errorMessage:"enter valid phone number"})

            if(!(VALIDATE_HELPER.phoneValidate(phone)&&VALIDATE_HELPER.phoneValidate(phoneFather)&&VALIDATE_HELPER.phoneValidate(phoneMother)))
                return res.status(400).json({errorMessage:"enter valid phone number"})


            if(!VALIDATE_HELPER.emailValidate(email))
                return res.status(400).json({errorMessage:"invalid email"})                

            if(address.length<10){
                return res.status(400).json({errorMessage:"Minimum address length 10"})
            }

            if(pincode.toString().length!=6)
                return res.status(400).json({errorMessage:"enter valid pincode"})

            const existingAdmNumber = await STUDENT.findOne({admNumber})
            if(existingAdmNumber)
                return res.status(400).json({errorMessage:"Admission number already allotted"})
            
            let salt = await bcrypt.genSalt();
            let passwordHash = await bcrypt.hash(process.env.DEFAULT_PASSWORD,salt)
            
            
            const newStudent = new STUDENT({
                firstName:firstName.toUpperCase(),
                lastName:lastName.toUpperCase(),
                email,phone,dob,bloodGroup,
                nameFather:nameFather.toUpperCase(),
                nameMother:nameMother.toUpperCase(),
                phoneFather,phoneMother,occupationFather,occupationMother,                    address,pincode,admNumber,admDate,className,division,passwordHash
            })
    
            const addedStudent = await newStudent.save()

            res.status(200).json({success:true,data:addedStudent})

        } catch (error) {
            console.log(err)
            res.status(500).json({errorMessage:"error"})
        }
    },

    studentSearch:async(req,res)=>{
        let result=await STUDENT_HELPER.getStudents(req.query.search,req.query.className,req.query.division)
        if(result.query){
            res.status(200).json({success:true,data:result.data})
        }else
            res.status(400).json({success:false})
    },

    studentEdit: async(req,res)=>{
        try {
            const {id,email, phone,nameFather,nameMother,phoneFather, phoneMother,occupationFather, occupationMother, address, pincode,className, division} = req.body

            if(!email|| !phone ||!nameFather||!nameMother||!phoneFather|| !phoneMother||!occupationFather|| !occupationMother|| !address|| !pincode||!className|| !division)
                return res.status(400).json({errorMessage:"please fill mandatory fields"})

            if(!VALIDATE_HELPER.emailValidate(email)){
                return res.status(400).json({errorMessage:"Enter valid email"})
            }

            if(!(VALIDATE_HELPER.phoneValidate(phone)&&VALIDATE_HELPER.phoneValidate(phoneFather)&&VALIDATE_HELPER.phoneValidate(phoneMother)))
                return res.status(400).json({errorMessage:"enter valid phone number"})

            if(address.length<10){
                return res.status(400).json({errorMessage:"Minimum address length 10"})
            }

            if(pincode.toString().length!=6)
                return res.status(400).json({errorMessage:"enter valid pincode"})
            
            await STUDENT.updateOne({_id:ObjectId(id)},{$set:{email,phone,nameFather:nameFather.toUpperCase(),nameMother:nameMother.toUpperCase(),occupationFather,occupationMother,address,className,division,pincode}})

            res.status(200).json({success:true})
        } catch (error) {
            
        }
    },

    studentPromote:async(req,res)=>{
        const data = await STUDENT_HELPER.promoteStudent(req.body.id)
        if(data.query){
            res.status(200).json({success:true})
        }else
            res.status(400).json({success:false})
    },

    bookAdd: async(req,res)=>{
        try {
            const {title,author,isbn,price,category,quantity,description} = req.body 
            if(!title||!author||!isbn||!price||!category||!quantity||!description)
                return res.status(400).json({errorMessage:"Please enter all fields"})

            const existingIsbn = await BOOK.findOne({isbn})
            if(existingIsbn)
                return res.status(400).json({errorMessage:"A book with this ISBN already exists"})

            if(price<1 || quantity<1)
                return res.status(400).json({errorMessage:"negative numbers not allowed"})

            const newBook = new BOOK({title,author,isbn,price,category,quantity,description})

            const addedBook = await newBook.save()

            return res.status(200).json({success:true,data:addedBook})
        } catch (error) {
            console.log(error)
            res.status(500).json({error:"internal error"})
        }
    },

    bookEdit: async(req,res)=>{
        try {
            const {id,title,author,isbn,price,category,quantity,description} = req.body 
            if(!title||!author||!isbn||!price||!category||!quantity||!description)
                return res.status(400).json({errorMessage:"Please enter all fields"})

            if(price<1 || quantity<1)
                return res.status(400).json({errorMessage:"negative numbers not allowed"}) 
            
            const result = await BOOK.updateOne({_id:ObjectId(id)},{$set:{title,author,isbn,price,category,quantity,description}})
            if(result.modifiedCount > 0)
                return res.status(200).json({success:true})
            else
                return res.status(400).json({success:false})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error:"internal error"})
        }
    },

    staffAttandance:async(req,res)=>{
        try {
            const {absent} = req.body;
            const data= await ATTENDANCE_MARKED_HELPER.markedAttendance(ATTENDANCE_STAFF)

            if(data.marked){
                return res.status(400).json({success:false,errorMessage:"Attendance already marked"})
            }

            const staffAbsent = new ATTENDANCE_STAFF({
                absent,
                date:DATE(new Date())
            })
            const newEntry = await staffAbsent.save()

            res.status(200).json({success:true,data:newEntry})
        } catch (error) {
            console.log(error);
            res.status(500).json({errorMessage:"Internal error"})
        }
    },

    studentAttandance:async(req,res)=>{
        try {
            const {absent,className,division} = req.body;
            const data= await ATTENDANCE_MARKED_HELPER.markedAttendanceStudent(ATTENDANCE_STUDENT,className,division)

            if(data.marked){
                return res.status(400).json({success:false,errorMessage:"Attendance already marked"})
            }

            const studentAbsent = new ATTENDANCE_STUDENT({absent,className,division,date:DATE(new Date())})
            const newEntry = await studentAbsent.save()
            
            res.status(200).json({success:true,data:newEntry})
        } catch (error) {
            console.log(error);
            res.status(500).json({errorMessage:"Internal error"})
        }
    },

    getStaffAttandeance:async(req,res)=>{
        try {
            const {date} = req.query;
            const data = await TEACHER_HELPER.getAttendance(date)
            console.log(date)
            console.log(data.data)
        } catch (error) {
            console.log(error);
            res.status(500).json({errorMessage:"Internal error"})
        }
    }

}