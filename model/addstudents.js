const mongoose = require("mongoose");
const validator = require("validator");

// add students
const addstudents = new mongoose.Schema({
    rollno:{
        type:Number,
        required:true,
        default:0
    },
    first_name : {
        type:String,
        required:true
    },
    midal_name : {
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
    date_of_birth: {
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
    Courses : {
        type:String,
        required:true
    }
})

const newstudent = new mongoose.model("newstudent" , addstudents);
module.exports = newstudent;


