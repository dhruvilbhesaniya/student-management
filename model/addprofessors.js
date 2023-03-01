const mongoose = require("mongoose");
const validator = require("validator");

// add students
const addprofessors = new mongoose.Schema({
    no:{
        type:Number,
        // default:{$inc: { seq: 1 }},
        // new: true
        default:1
    },
    first_name : {
        type:String,
        required:true
    },
    last_name : {
        type:String,
        required:true
    },
    Email :{
        type:String,
        required:true,
        unique:[true,"email is already presnt"]
    },
    Addres :{
        type:String,
        required:true
    },
    Joining_date: {
        type:String,
        required:true
    },
    gendre :{
        type:String,
        required:true
    },
    phone : {
        type:Number,
        min: 10,
        required:true,
        unique:true
        
    },
    Departments : {
        type:String,
        required:true
    },
    Degree:{
        type:String,
        require:true
    }
})

const allprofessors = new mongoose.model("allprofessors" , addprofessors);
module.exports = allprofessors;


