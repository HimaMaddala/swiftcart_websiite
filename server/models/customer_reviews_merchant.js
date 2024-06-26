import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  product_id: {
    type: String,
    required: true
  },
  review_text: {
    type: [String],
    required: true
  },
  ratings: {
    type: [Number],
    required: true
  },
});
  
const reviewModel = mongoose.model("pythonrevs", reviewSchema);
export default reviewModel;
  