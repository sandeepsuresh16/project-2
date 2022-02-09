const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    isbn:{type:Number,unique:true},
    category:{type:String},
    price:{type:Number},
    quantity:{type:Number},
    description:{type:String}
},{timestamps:true})

const BOOK = mongoose.model("Book",bookSchema)

module.exports = BOOK;