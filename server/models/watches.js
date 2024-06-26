import mongoose from "mongoose";

const WatchSchema = new mongoose.Schema({
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
  
const WatchesModel = mongoose.model("watches", WatchSchema);
export default WatchesModel;
  