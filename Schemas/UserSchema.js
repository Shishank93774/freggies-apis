const mongoose = require('mongoose');
const ProductData = require('./ProductSchema');

const userSchema = new mongoose.Schema({
    firstname:{type: String, required:true, min:3},
    lastname:{type:String,required:true, min:3},
    email:{type:String, required:true, min:3,unique:true},
    password:{type: String, required:true, min:5},
    phone:{type:Number, required:true, min:3, unique:true},
    address:{type:String, required:true, min:3, unique:true, min:3},
    usertype:{type:String, required:true},
    boughtProducts:[{
        type:mongoose.Schema.Types.ObjectID, ref: {ProductData}
    }]
})

const UserModel = mongoose.model('UserData', userSchema);

module.exports = UserModel;
