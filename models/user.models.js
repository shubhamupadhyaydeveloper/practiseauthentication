const mongoose = require('mongoose')
const passportlocalmogoose = require('passport-local-mongoose')

const userschema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    }
})

userschema.plugin(passportlocalmogoose)

const User = mongoose.model('User' , userschema)

module.exports = User;