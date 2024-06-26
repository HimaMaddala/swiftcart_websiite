import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});
  
const ordersModel = mongoose.model("orders_dbs", ordersSchema);
export default ordersModel;
  