const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {type:String, required:true, trim:true, default:''},
    email: {type:String, required:true, trim:true, default:''},
    contact: {type:Number, default:0},
    password: {type:String, required:true, trim:true, default:''},
    isAdmin: {type:Boolean, default:false}
})

module.exports = mongoose.model('User', User)