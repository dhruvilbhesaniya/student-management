const jwt = require("jsonwebtoken");
const adminmodual = require("../model/adminragister");


const auth = async (req, res, next) =>{
    try{
            
            const token = req.cookies.jwt;
            const verifyuser = jwt.verify(token, process.env.SECRET_KEY);
            
            const user = await adminmodual.findOne({_id:verifyuser._id});
                     

            req.token = token;
            req.user = user;
           // console.log(req.user);   
            
            next();
    }catch(error){
        res.render("admin/error");
    }
}



module.exports = auth;