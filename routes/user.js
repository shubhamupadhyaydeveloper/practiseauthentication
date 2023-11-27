const express = require('express')
const router = express.Router()
const User = require('../models/user.models.js')
const Wrapper = require('../error/Wrapper.js')
const passport = require('passport')

router.get('/signup' , (req ,res) => {
    res.render('render/signup')
})

router.post('/signup' , Wrapper( async (req ,res) => {
    try {   
        let {username , email , password} = req.body;
        let user = new User({username , email})
        let newuser = await User.register(user , password)
        console.log(newuser)
        req.login(newuser, function(err) {
            if (err) { return next(err); }
            req.flash('success' , 'Sign successful')
            res.redirect('/')
          });
    } catch (error) {
        req.flash('error' , error.message)
        res.redirect('/signup')
    }
}))

router.get('/login' , (req ,res) => {
    res.render('render/login')
})

router.post('/login' , passport.authenticate('local' , {
    failureRedirect : '/login',
    failureFlash : true
}) ,(req , res) => {
    req.flash('success' , 'you logged in')
   res.redirect('/')
})

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash('success' , 'You logout')
      res.redirect('/');
    });
  });

module.exports = router;