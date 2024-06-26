import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  img_url: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  merchant: {
    type: String,
    required: true
  }
});
  
const ProductModel = mongoose.model("products", ProductSchema);
export default ProductModel;
  