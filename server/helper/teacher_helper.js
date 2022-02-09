const STUDENT = require('../model/register_student')
const TEACHER = require('../model/register_teacher')

module.exports = {

    searchTeacher : (data)=>{
        return new Promise(async(resolve, reject)=>{
            try {
                let teacher = await TEACHER.aggregate([{$match:{name:{$regex: new RegExp("^" + data,"i")}}}])
                if(teacher.length>0)
                    resolve({query:true,data:teacher})
                else
                    resolve({query:false})
            } catch (error) {
                console.log(error)
                resolve({query:false})
            }

        })
        
    },

    getAttendance : (date)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                const qrData = await STUDENT.aggregate([{$match:{date}}])
                console.log(qrData)
                resolve({query:true,date:qrData})
            } catch (error) {
                console.log(error)
                resolve({query:false})
            }
        }) 
    }
}