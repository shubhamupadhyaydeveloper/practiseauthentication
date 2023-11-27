const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userrouter = require('./routes/user.js')
const homerouter = require('./routes/home.js')
const path = require('path')
const passport = require('passport')
const localstagery = require('passport-local')
const User = require('./models/user.models.js')
const session = require('express-session')
const flash = require('connect-flash')
const ejsmate = require('ejs-mate')


app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname , 'views'))
app.use(express.urlencoded({extended : true}))
app.use(express.static(path.join(__dirname , 'public')))
app.engine('ejs' , ejsmate)

app.use(session({
    secret : 'mysupersecret',
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000 ,
        httpOnly : true
    }
}))
app.use(flash())
 
// mongoose connector
async function calldb() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Auth')
        console.log('You are connected to mongoose')
    } catch (error) {
        console.log(error.message)
    }
}
calldb()

//listen port
app.listen(5000 , () => {
   console.log('app is listing on 5000')
})

app.use(passport.initialize())
app.use(passport.session()) 

app.use((req ,res , next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.curruser = req.user;
    next()
})

passport.use(new localstagery(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use('/' , userrouter )
app.use('/' , homerouter)

app.use('*' , (req , res) => {
    res.send('Sorry! Page not exist')
})

app.use((err ,req ,res,next) => {
    let {statusCode=500 , error='Something went wrong'} = err
    res.status(statusCode).send(err.message)
})