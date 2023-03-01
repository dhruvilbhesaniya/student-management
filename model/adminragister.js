const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminragister = new mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:[true,"email is already presnt"]
    },
    password :{
        type:String,
         required:true
    },
    conformpassword :{
        type:String,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})


//token
adminragister.methods.generateAuthToken = async function(){
    try {
       // console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()},"BestUniversitiesForStudentsAndTheBestUniversitiesToVisit");
        //console.log(token);
       this.tokens = this.tokens.concat({token:token})
        await this.save();
       return token;
    } catch(error) {    
        res.send(error); 
        console.log(error);
    }
} 
// hash password
adminragister.pre("save" ,async function(next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10);
       // this.conformpassword = await bcrypt.hash(this.conformpassword , 10);
       
    }
    next();
})

const adminmodual = new mongoose.model("admin",adminragister)

module.exports = adminmodual;