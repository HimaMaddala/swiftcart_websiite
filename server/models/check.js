import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  check_names: {
    type: [String], // Array of strings
    required: true
  },
});
  
const OrdersModel = mongoose.model("checks", orderSchema);
export default OrdersModel;
