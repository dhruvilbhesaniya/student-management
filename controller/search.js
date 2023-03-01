const newstudent = require("../model/addstudents");


const getstudent = async (req,res) => {
        console.log( req.query);
        const {name} = req.query;


        let search;
        if(name == undefined ){

             search = await newstudent.find();
        }else{

                 search = await newstudent.find({$or:[{Addres:{ $regex: name, $options: "i" }},{first_name:{ $regex: name, $options: "i" }},{midal_name:{ $regex: name, $options: "i" }},{last_name:{ $regex: name, $options: "i" }},{Courses:{ $regex: name, $options: "i" }}]});
             }
                res.render("admin/allstudents",{dataget:search});

};

module.exports ={getstudent};