const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

module.exports = {

    adminLogin : (req,res)=>{
        const {username, password} = req.body
        const adminUser = "admin@gmail.com";
        const adminPassword = "admin@123"

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
        res.cookie("token",token,{
            httpOnly:true
        }).send()

        console.log('Admin logged IN')
    },

    loggedIn :(req,res)=>{
        try{
            if(req.user=="admin")
                res.status(200).json(true)
            else 
                res.status(200).json(false)

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
        const {name,qualification, email, address, phone, section, dob, salary} = req.body;
        
    }
}