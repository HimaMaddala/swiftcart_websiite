import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  img_url: {
    type: String,
    required: true
  },
  size:{
    type: String,
    required: true
  },
  quantity:{
    type:Number,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  total_price:{
    type:Number,
    required:true
  },
  order_date:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  merchant:{type: String,
  required: true
}
});
  
const OrdersModel = mongoose.model("orderstables", orderSchema);
export default OrdersModel;
  