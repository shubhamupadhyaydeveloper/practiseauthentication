const express = require('express')
const router = express.Router()


router.get('/' , (req , res) => {
    res.render('render/home.ejs')
})

router.get('/post', (req ,res) => {
    if(req.isAuthenticated()) {
        res.render('render/post.ejs')
    }else {
        req.flash('error' , 'please login first')
        res.redirect('/login')
    }
})

module.exports = router;