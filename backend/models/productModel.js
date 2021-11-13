import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    brand: {type: String},
    image: {type: String},
    description: {type: String},
    review: {type: Number},
    order: {type: Number},
    new_price: {type: Number},
    old_price: {type: Number},
    countInStock: {type: Number},
},

);

const Products = mongoose.model("Products", productSchema);

export default Products;