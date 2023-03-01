const express = require("express");
const allcourse = require("../model/addcourse");
const router = express.Router();
const fromragistetion = require("../model/schema");

router.route("/user/index").get( async(req, res) =>{
    try{
        const c_data = await allcourse.find();
       
        res.render("user/index",{course_data:c_data});
    }catch(e){
        res.send(e);
    }
    // res.render("user/index");
})

router.route("/user/about").get( (req, res) =>{
    res.render("user/about");
})

router.route("/user/contact").get( (req, res) =>{
    res.render("user/contact");
})

router.route("/user/courses").get( async(req, res) =>{
        try{
            const c_data = await allcourse.find();
           
            res.render("user/courses",{course_data:c_data});
        }catch(e){
            res.send(e);
        }
    
})

router.route("/user/event").get( (req, res) =>{
    res.render("user/event");
})

router.route("/user/gallery").get( (req, res) =>{
    res.render("user/gallery");
})

router.route("/user/ragistetion").get( (req, res) =>{
    res.render("user/ragistetion");
})

router.route("/user/login").get( (req, res) =>{
    res.render("user/login");
})


// user registetion
router.route("/user/ragistetion").post( async(req, res) =>{
    try{
       
        const password = req.body.password;
        const conformpassword = req.body.conformpassword;
      
        // console.log("helo");
        if(password === conformpassword){
            const studentdataR = new fromragistetion({
                first_name : req.body.firstname,
                midal_name : req.body.mname,
                last_name  : req.body.lname,
                Email : req.body.email,
                Addres : req.body.city,
                date_of_birth : req.body.dob,
                gendre : req.body.gender,
                phone : req.body.phone,
                Courses : req.body.course,
                password : password,
                conformpassword : conformpassword
            })
              const studentsave = await studentdataR.save();
            
              res.render("user/index");
              
        }else{
            res.send("password not maching")
        }

    }catch(e){
        res.send(e);
    }
})

//user login
router.route("/user/login").post( async(req, res) =>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const studentemail = await fromragistetion.findOne({Email:email});
        const ismatch = await bcrypt.compare(password , studentemail.password);

        if(ismatch){
            res.render("user/index");
        }else{
            res.send("not valid");
        }
    }catch(e){  
        res.send(e);
    }
})




module.exports =router;