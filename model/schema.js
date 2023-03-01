const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const studentragistetion = new mongoose.Schema({
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
        min:10,
        required:true,
        unique:true
        
    },
    Courses : {
        type:String,
        required:true
    },
    password :{
        type:String,
         required:true
    },
    conformpassword :{
        type:String,
      required:true
    }
    
})


studentragistetion.pre("save" ,async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10);
        this.conformpassword = await bcrypt.hash(this.conformpassword , 10);
       
    }
    next();
})



//creat to colection

const fromragistetion = new mongoose.model("fromragistetion" , studentragistetion);

module.exports = fromragistetion;


// add students
// const addstudents = new mongoose.Schema({
//     first_name : {
//         type:String,
//         required:true
//     },
//     midal_name : {
//         type:String,
//         required:true
//     },
//     last_name : {
//         type:String,
//         required:true
//     },
//     Email :{
//         type:String,
//         required:true,
//         unique:[true,"email is already presnt"]
//     },
//     Addres :{
//         type:String,
//         required:true
//     },
//     date_of_birth: {
//         type:String,
//         required:true
//     },
//     gendre :{
//         type:String,
//         required:true
//     },
//     phone : {
//         type:Number,
//         min:10,
//         required:true,
//         unique:true
        
//     },
//     Courses : {
//         type:String,
//         required:true
//     }
// })

// const newstudent = new mongoose.model("newstudent" , addstudents);
// module.exports = newstudent;


