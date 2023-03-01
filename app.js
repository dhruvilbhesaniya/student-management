require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT ||8000
require("./database/conne");
const router = require("./router/userRouter");
const adminrouter = require("./router/adminRouter");
const path = require("path");
const hbs = require("hbs");
const js = require("./public/js/main");
//const auth = require("./midalware/auth");
//const cookieparser = require("cookie-parser");


const static_path = path.join(__dirname,"./public");
const user_tempalate_path = path.join(__dirname,"./tempalate/views");
const user_partials_path = path.join(__dirname,"./tempalate/partials");


app.use(express.static(static_path));
app.set("view engine" ,"hbs");

app.set("views" ,user_tempalate_path);
hbs.registerPartials(user_partials_path);

app.use(express.json());
app.use(express.urlencoded({extended:false})); // => most imp

//router
app.use("/" ,router );
app.use("/" , adminrouter)




app.listen(PORT ,() =>{
    console.log(`${PORT} server start...`);
})