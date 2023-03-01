const express = require("express");
const app = express();
const adminrouter = express.Router();
const adminmodual = require("../model/adminragister");
const newstudent = require("../model/addstudents");
const allprofessors = require("../model/addprofessors");
const allcourse = require("../model/addcourse");
const auth = require("../midalware/auth");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const { mongo } = require("mongoose");
const path = require("path");
// const assert = require("assert");
require("../database/conne")
const mongoose = require("mongoose");
const multer = require("multer");
adminrouter.use(cookieparser());
const { getstudent } = require("../controller/search")



adminrouter.route("/admin/index").get(auth, async (req, res) => {
    try {
        const scount = await newstudent.find().count();
        const pcount = await allprofessors.find().count();
        const c_count = await allcourse.find().count();
        // const name = await adminmodual.find();

        res.render("admin/index", { sobj: scount, pobj: pcount, course_c: c_count });
        // res.redirect("../admin/index");
    } catch (e) {
        res.send(e);
    }

})

// *******************************<=Professors Section Start=>*******************************

adminrouter.route("/admin/allprofessors").get(async (req, res) => {
    try {
        const pdata = await allprofessors.find();

        res.render("admin/allprofessors", { pdataget: pdata });

    } catch (e) {
        res.send(e)
    }
})

adminrouter.route("/admin/addprofessors").get((req, res) => {
    res.render("admin/addprofessors");
})

// add professors
adminrouter.route("/admin/addprofessors").post(async (req, res) => {
    try {
        const addprofessors = new allprofessors({
            // rollno:  { $inc: 1 }, 
            first_name: req.body.pfname,
            last_name: req.body.plname,
            Email: req.body.email,
            Addres: req.body.city,
            Joining_date: req.body.jdata,
            gendre: req.body.gender,
            phone: req.body.phone,
            Departments: req.body.department,
            Degree: req.body.education
        })

        const addprofessorssave = await addprofessors.save();


        if (addprofessorssave) {
            res.redirect("../admin/allprofessors")
        }
    } catch (e) {
        res.send(e);
    }
})

// professors data fil
adminrouter.route("/admin/editprofessors/:id").get(async (req, res) => {
    try {
        const _id = req.params.id;

        const peditdata = await allprofessors.findById(_id);


        res.render("admin/editprofessors", { palldata: peditdata });

    } catch (e) {
        res.send(e)
    }
})

// updata professors
adminrouter.route("/admin/updataprofessors/:id").post(async (req, res) => {
    const { first_name, last_name, Email, Addres, Joining_date, gendre, phone, Departments, Degree } = req.body
    try {

        const _id = req.params.id;

        const presult = await allprofessors.findByIdAndUpdate(_id, { $set: { first_name, last_name, Email, Addres, Joining_date, gendre, phone, Departments, Degree } }, { new: true })

        if (presult) {
            res.redirect("../../admin/allprofessors");
        }
    } catch (e) {
        res.send(e);
    }


});

//delet professors
adminrouter.route("/admin/allprofessors/:id").get(async (req, res) => {
    try {
        const _id = req.params.id;

        const pDelete = await allprofessors.deleteOne({ _id })

        //console.log(Delete);
        if (pDelete) {
            res.redirect("../../admin/allprofessors");
        }
    } catch (e) {
        res.send(e);
    }


});

// *******************************<=Student Section Start=>*******************************


adminrouter.route("/admin/allstudents").get(getstudent);


// student data get
adminrouter.route("/admin/allstudents").get(async (req, res) => {

    try {

        const data = await newstudent.find();

        res.render("admin/allstudents", { dataget: data });

    } catch (e) {
        res.send(e)
    }

})

adminrouter.route("/admin/addstudents").get((req, res) => {
    res.render("admin/addstudents");
})


//Add students




adminrouter.route("/admin/addstudents/:rollno").post(async (req, res) => {
    try {
        const Rno= req.params.rollno;
        console.log(Rno);
        // console.log("hello");
        //  console.log(increment());

        // var Rno = newstudent.find(rollno);
        // console.log(Rno);
        // const increment = () => {
        //     // console.log("done");

        //     return Rno = Rno + 1;

        // }
        const addstudent = new newstudent({


            rollno: increment(),
            first_name: req.body.firstname,
            midal_name: req.body.mname,
            last_name: req.body.lname,
            Email: req.body.email,
            Addres: req.body.city,
            date_of_birth: req.body.dob,
            gendre: req.body.gender,
            phone: req.body.phone,
            Courses: req.body.course
        })
        const addstudentsave = await addstudent.save();
        // console.log(addstudentsave.rollno);


        if (addstudentsave) {
            res.redirect("../admin/allstudents")
        }
    } catch (e) {
        res.send(e);
    }
})


// student data fil

adminrouter.route("/admin/editstudents/:id").get(async (req, res, next) => {
    try {
        const _id = req.params.id;

        const editdata = await newstudent.findById(_id);


        res.render("admin/editstudents", { alldata: editdata });

    } catch (e) {
        res.send(e)
    }

})

// update student

adminrouter.route("/admin/updatastudents/:id").post(async (req, res) => {
    const { first_name, midal_name, last_name, Email, Addres, date_of_birth, gendre, phone, Courses } = req.body
    try {

        const _id = req.params.id;

        const result = await newstudent.findByIdAndUpdate(_id, { $set: { first_name, midal_name, last_name, Email, Addres, date_of_birth, gendre, phone, Courses } }, { new: true })

        // console.log(result);
        if (result) {
            res.redirect("../../admin/allstudents");
        }
    } catch (e) {
        res.send(e);
    }


});

// delet student 

adminrouter.route("/admin/allstudents/:id").get(async (req, res) => {
    try {
        const _id = req.params.id;
        // console.log(_id);
        const Delete = await newstudent.deleteOne({ _id })

        // console.log(Delete);
        if (Delete) {
            res.redirect("../../admin/allstudents");
        }
    } catch (e) {
        res.send(e);
    }


});

// *******************************<= Student Section End =>*******************************



// //Edit student api
// adminrouter.route("/admin/editstudents/:id").patch( async(req, res) =>{
//             try{
//                 const _id = req.params.id;
//                 console.log(_id);
//                 const result = await newstudent.findOneAndUpdate(_id,req.body,{new:true});
//                 res.send(result)
//             }catch(e){
//                 console.log(e);
//             }

// }) 


adminrouter.route("/admin/ragister").get((req, res) => {
    res.render("admin/ragister");
})

adminrouter.route("/admin/login").get((req, res) => {
    res.render("admin/login");
})

// logout admin
adminrouter.route("/admin/logout").get(auth, async (req, res) => {
    try {

        req.user.tokens = req.user.tokens.filter((currntToken) => {
            return currntToken.token != req.token
        })

        res.clearCookie("jwt");
        console.log("logout successfully");

        await req.user.save();
        res.render("admin/login");


    } catch (e) {
        res.render("error")
    }
})


// Admin ragister
adminrouter.route("/admin/ragister").post(async (req, res) => {
    try {
        const password = req.body.password;
        const conformpassword = req.body.cpassword;

        if (password === conformpassword) {
            const adminRagister = new adminmodual({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                conformpassword: ""
            })

            const token = await adminRagister.generateAuthToken();

            res.cookie("jwt", token, {
                // expires:new Date(Date.now() + 300000),
                httpOnly: true
            });

            const adminsave = await adminRagister.save();

            res.render("admin/index", { name: adminsave.name })

        } else {
            res.send("password not maching")
        }

    } catch (e) {
        res.send(e);
    }

})

// Admin Login
adminrouter.route("/admin/login").post(async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const adminemail = await adminmodual.findOne({ email: email });
        const pmatch = await bcrypt.compare(password, adminemail.password);

        const token = await adminemail.generateAuthToken();

        res.cookie("jwt", token, {
            //expires:new Date(Date.now() + 300000),
            httpOnly: true
        });

        if (pmatch) {
            res.render("admin/index", { name: adminemail.name });
        } else {
            res.send("not velid");
        }
    } catch (e) {
        res.send(e);
    }
})


// **********************<=Course Session start=>*************************//

// multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/course_img'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const Uplode = multer({ storage: storage })


adminrouter.route("/admin/addcourse").get((req, res) => {
    res.render("admin/addcourse");
})

// course get
adminrouter.route("/admin/allcourse").get(async (req, res) => {
    try {
        const coursedata = await allcourse.find();
        // console.log(coursedata); 

        res.render("admin/allcourse", { course_d: coursedata });

    } catch (e) {
        res.send(e);
    }

})

//course post
adminrouter.route("/admin/addcourse").post(Uplode.single('picture'), async (req, res) => {
    try {

        // let x = 1;
        // function increment(){
        //      x = x + 1;

        // }   
        // console.log(x);

        // console.log(i);
        const addcourse = new allcourse({
            // no:x,
            Course_name: req.body.cname,
            Starting_date: req.body.date,
            Course_duration: req.body.duration,
            Course_price: req.body.price,
            Professor_name: req.body.pname,
            Profile_Picture: req.file.filename,
            // Course_populer: req.body.populer
        })

        const addcoursesave = await addcourse.save();
        // console.log(addcoursesave);
        if (addcoursesave) {
            // res.render("admin/allcourse");
            res.redirect("../admin/allcourse");
        }

    } catch (e) {
        res.send(e);
    }

})

//course edit
adminrouter.route("/admin/editcourse/:id").get(async (req, res) => {
    try {
        const _id = req.params.id;

        const c_editdata = await allcourse.findById(_id);

        // console.log(c_editdata);
        res.render("admin/editcourse", { c_alldata: c_editdata });

    } catch (e) {
        res.send(e)
    }


})

// course update
adminrouter.route("/admin/updatecourse/:id").post(async (req, res) => {
    const { Course_name, Starting_date, Course_duration, Course_price, Professor_name } = req.body
    try {

        const _id = req.params.id;

        const c_result = await allcourse.findByIdAndUpdate(_id, { $set: { Course_name, Starting_date, Course_duration, Course_price, Professor_name } }, { new: true })

        // console.log(result);
        if (c_result) {
            res.redirect("../../admin/allcourse");
        }
    } catch (e) {
        res.send(e);
    }


});


//course delete
adminrouter.route("/admin/allcourse/:id").get(async (req, res) => {
    try {
        const _id = req.params.id;
        // console.log(_id);
        const c_Delete = await allcourse.deleteOne({ _id })

        // console.log(Delete);
        if (c_Delete) {
            res.redirect("../../admin/allcourse");
        }
    } catch (e) {
        res.send(e);
    }


});

module.exports = adminrouter;