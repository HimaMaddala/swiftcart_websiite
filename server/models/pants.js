import mongoose from "mongoose";

const PantShcema = new mongoose.Schema({
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
  price: {
    type: Number,
    required: true
  }
});
  
const PantsModel = mongoose.model("pants", PantShcema);
export default PantsModel;
  