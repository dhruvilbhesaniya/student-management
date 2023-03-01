const mongoose = require("mongoose");
const validator = require("validator");

// add students
const addcourse = new mongoose.Schema({
    // no: {
    //     type:Number,
    //     required:true,
    //     // default:1
    // },
    Course_name: {
        type:String,
        required:true,
        unique:true
    },
    Starting_date : {
        type:String,
        required:true
    },
    Course_duration : {
        type:String,
        required:true
    },
    Course_price :{
        type:Number,
        required:true,
        
    },
    Professor_name :{
        type:String,
        required:true
    },
    Profile_Picture: {
        type:String,
        required:true
    }
   
})

const allcourse = new mongoose.model("allcourse" , addcourse);
module.exports = allcourse;


