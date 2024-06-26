import mongoose from "mongoose";

const ShoeSchema = new mongoose.Schema({
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
  price: {
    type: Number,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  matching_pants_id: {
    type: String,
    required: true
  },
  matching_shirts_id: {
    type: String,
    required: true
  },
  matching_watches_id: {
    type: String,
    required: true
  }
});
  
const ShoesModel = mongoose.model("shoes", ShoeSchema);
export default ShoesModel;
  