const express = require("express");
const app = express();
const dotenv = require("dotenv")
dotenv.config();
const cookieParser = require("cookie-parser");
const adminRoute = require('./routes/adminRoute');
const teacherRoute = require('./routes/teacherRoute');
const studentRoute = require('./routes/studentRoute');
require('./model/connection');


app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use('/admin',adminRoute);
app.use('/teacher',teacherRoute);
app.use('/student',studentRoute);

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server listening at port : ${PORT}`)
})