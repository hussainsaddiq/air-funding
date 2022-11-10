const express = require("express");
const env = require("dotenv");
const session = require("express-session")
const jwtDecode = require("jwt-decode")
const cookieParser = require("cookie-parser")
const homeRoutes = require("./routes/homeRoutes")
const userRoutes = require("./routes/userRoutes")
const projectRoutes = require("./routes/projectRoutes")
const adminRoutes = require("./routes/adminRoutes")
const connect = require("./config/db")
const User = require("./models/User")
env.config();
const app = express(); 

// connect database 
connect()
// load static files
app.use(express.static('./views'))
app.use(cookieParser())
// set up view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5000;
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
// all routes
app.use(homeRoutes);
app.use((req, res, next) => {
    if(req.cookies?.donationUser) {
        const id = jwtDecode(req.cookies.donationUser );
            User.findById(id.id).then(function(user) {
            if(user) {
                 req.user = user;
                next();
            }
        }).catch(function(error) {
            console.log('token Error: ', error.message)
            next();
        })
    } else {
        next()
    }

});
app.use(userRoutes);
app.use(projectRoutes)
app.use(adminRoutes)
app.listen(PORT, () => {
    console.log(`Your server is running on port number ${PORT}`);
});