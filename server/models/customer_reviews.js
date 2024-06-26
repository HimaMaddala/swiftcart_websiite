import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  shirt_id: {
    type: String,
    required: true
  },
  review_text: {
    type: [String],
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
});
  
const reviewModel = mongoose.model("reviewstable", reviewSchema);
export default reviewModel;
  