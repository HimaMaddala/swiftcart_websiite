import mongoose from "mongoose";

const DealsSchema = new mongoose.Schema({
  shirt_id:{
    type:String,
    required:true
  },
  name: {
    type: String,
    required: true
  },
  img_url: {
    type: [String],
    required: true
  },
  mrp_price: {
    type: Number,
    required: true
  },
  discount_price: {
    type: Number,
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
  quantity:{
    type:Number,
    required:true
  },
  merchant: {
    type: String,
    required: true
  },
  fabric: {
    type: String,
    required: true
  },
  fit: {
    type: String,
    required: true
  },
  collar: {
    type: String,
    required: true
  },
  sleeves: {
    type: String,
    required: true
  }
});
  
const DealsModel = mongoose.model("hotdeals", DealsSchema);
export default DealsModel;
  