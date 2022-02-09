const STUDENT = require('../model/register_student')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = {

    searchStudent : (data)=>{
        return new Promise(async(resolve, reject)=>{
            try{
            let students = await STUDENT.aggregate([{$match:{firstName:{$regex: new RegExp("^" + data.toUpperCase())}}}])
            if(students.length>0)
                resolve({query:true,data:students})
            else
                resolve({query:false})
            }catch(err){
                console.log(err)
                resolve({query:false})
            }
        })
        
    },

    getStudents: (searchKey,className,division)=>{
        return new Promise(async(resolve,reject)=>{
            let searchResult
            try {
                if(searchKey && className && division){
                    searchResult = await STUDENT.aggregate([{$match:{firstName:{$regex:new RegExp("^"+searchKey,"i")},className:className.toString(),division}}])
                }else if(!searchKey && className && division){
                    searchResult = await STUDENT.aggregate([{$match:{className:className.toString(),division}}])
                }else if(!searchKey && !className && division){
                    searchResult = await STUDENT.aggregate([{$match:{division}}])
                }else if(searchKey && !className && !division){
                    searchResult = await STUDENT.aggregate([{$match:{firstName:{$regex:new RegExp("^" + searchKey,"i")}}}])
                }else if(searchKey && className && !division){
                    searchResult = await STUDENT.aggregate([{$match:{firstName:{$regex:new RegExp("^" + searchKey,"i")},className:className.toString()}}])
                }else if(!searchKey && !className && !division){
                    searchResult = await STUDENT.aggregate([{$match:{}}])
                }else if(!searchKey && className && !division){
                    searchResult = await STUDENT.aggregate([{$match:{className}}])
                }

                if(searchResult.length>0){
                    resolve({query:true,data:searchResult})
                }else
                    resolve({query:false})
            } catch (error) {
                console.log(error)
                resolve({query:false})
            }
        })

    },

    promoteStudent: (id)=>{
        return new Promise(async(resolve,reject)=>{
            try {
                const student = await STUDENT.aggregate([{$match:{_id:ObjectId(id)}}])
                
                let className = student[0].className
                if(className=="LKG" || className=="UKG"){
                    if(className=="LKG")
                        className="UKG"
                    else if(className=="UKG")
                        className=1    
                    console.log(className);   
                    await STUDENT.updateOne({_id:ObjectId(id)},{$set:{className:className.toString()}})
                    resolve({query:true})
                    return
                }else{
                    className = parseInt(className)
                    if(className>=1 && className<12){
                        className +=1
                        console.log(className);
                        await STUDENT.updateOne({_id:ObjectId(id)},{$set:{className:className.toString()}})
                        resolve({query:true})
                        return                        
                    }else{
                        console.log(className);
                        resolve({query:false})
                        return   
                    }
                }
            } catch (error) {
                console.log(error)
                resolve({query:false})
            }
        })
    }


}