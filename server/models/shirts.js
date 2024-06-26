import mongoose from "mongoose";

const ShirtShcema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  img_url: {
    type: [String],
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
  },
  matching_pants_id:{
    type: String,
    required: true
  },
  matching_shoes_id:{
    type: String,
    required: true
  },
  matching_watches_id:{
    type: String,
    required: true
  }
});
  
const ShirtsModel = mongoose.model("shirts", ShirtShcema);
export default ShirtsModel;
  