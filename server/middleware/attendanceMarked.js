const {ATTENDANCE_STUDENT,ATTENDANCE_STAFF} = require('../model/register_attendence')
const DATE = require('../helper/formatDate_helper')

// function markedAttendance(model){
//     return async(req,res)=>{
//         try{
//         const data = await model.aggregate([{$match:{date:new Date()}}])
//         if(data.length>0)
//             res.status(200).json({attendanceMarked:true})
//         else
//             res.status(200).json({attendanceMarked:false})
//         }catch(err){
//             console.log(err)
//             res.status(500).json({errorMessage:"Internal error"})
//         }
//     }
// }

function markedAttendance(model){
    
    return async (req,res)=>{
        console.log('2')
        try {
            if(model==ATTENDANCE_STAFF){
                const data = await model.aggregate([{$match:{date:DATE(new Date())}}])
                if(data.length>0)
                    res.status(200).json({attendanceMarked:true})
                else
                    res.status(200).json({attendanceMarked:false})
            }
            else if(model==ATTENDANCE_STUDENT){
                console.log("2.2")
                console.log(req.query.division)
                const data = await model.findOne({})
                console.log(data)
                if(data.length>0)
                    res.status(200).json({attendanceMarked:true})
                else
                    res.status(200).json({attendanceMarked:false})
            }

            
        } catch (error) {
            console.log(err)
            res.status(500).json({errorMessage:"Internal error"})
        }
    }
}



module.exports = markedAttendance;