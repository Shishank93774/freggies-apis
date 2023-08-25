const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    url:{type:String, required: true}
})

const productSchema = new mongoose.Schema({
 name:{type: String, required:true, unique:true},
 desc:{type: String, required:true},
 photoArray:[photoSchema],
 price:{type: Number, required:true},
 discount:{type: Number, required:true},
 category:{type: String, required:true}
});

const ProductModel = mongoose.model('ProductData', productSchema);

module.exports  = ProductModel