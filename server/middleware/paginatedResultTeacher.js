const TEACHER = require('../model/register_teacher')
const STUDENT = require('../model/register_student')

function paginatedResult(model){
    return async(req,res,next)=>{
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page -1)*limit;
        const endIndex = page*limit;

        const results = {}

        const count = await model.count()
        if(count>0){
            results.pages = Math.floor(count/limit)+1
        }else{
            results.pages = 0;
        }


        if(startIndex>0){
            results.previous = {page:page-1,limit:limit}
        }
        if(endIndex < await model.count()){
            results.next = {page:page+1, limit:limit}
        }

        try{
            results.result = await model.find().limit(limit).skip(startIndex)
            res.paginatedResult = results
            next()

        }catch(e){
            console.log(e)
            res.status(500).json({message:e.message})
        }
        

        
    }
}

module.exports = paginatedResult;