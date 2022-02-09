const {ATTENDANCE_STAFF,ATTENDANCE_STUDENT} = require('../model/register_attendence')
const DATE = require('../helper/formatDate_helper')

module.exports = {
    markedAttendance:async(model)=>{
        return new Promise(async(resolve, reject)=>{
            try{
                const data = await model.aggregate([{$match:{date:DATE(new Date())}}])
                if(data.length>0)
                    resolve({marked:true})
                else   
                    resolve({marked:false})
            }catch(err){
                console.log(err)
            }
        })
        

    },

    markedAttendanceStudent:async(model,className,division)=>{
        return new Promise(async(resolve, reject)=>{
            try{
                const data = await model.aggregate([{$match:{date:DATE(new Date()),className,division}}])
                if(data.length>0)
                    resolve({marked:true})
                else   
                    resolve({marked:false})
            }catch(err){
                console.log(err)
            }
        })
    }
}