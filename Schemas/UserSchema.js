const mongoose = require('mongoose');
const ProductData = require('./ProductSchema');

const userSchema = new mongoose.Schema({
    firstname:{type: String, required:true, min:3},
    lastname:{type:String, min:3},
    email:{type:String, required:true, min:3,unique:true},
    password:{type: String, required:true, min:6},
    phone:{type:Number, required:true, min:3, unique:true},
    address:{type:String, required:true, min:3},
    usertype:{type:String, required:true},
    token:{type:String},
    boughtProducts:[{
        id: {type:String}, qty: {type:Number, default: 0}
    }]
})

const UserModel = mongoose.model('UserData', userSchema);

module.exports = UserModel;
