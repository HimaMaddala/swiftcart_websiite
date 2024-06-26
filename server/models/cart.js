import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  product_id:{
    type:String,
    required:true
  },
  name: {
    type: String,
    required: true
  },
  img_url: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price:{
    type:Number,
    required:true
  },
  color: {
    type: String,
    required: true
  },
  quantity:{
    type:Number,
    required:true
  },
  merchant: {
    type: String,
    required: true
  },
  size:{
    type: String,
    required: true
  },
  amount:{
    type:Number,
    required:true
  }
});
  
const CartModel = mongoose.model("carttables", cartSchema);
export default CartModel;
  