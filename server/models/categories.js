import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  img_url: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});
  
const CategoryModel = mongoose.model("categories", CategorySchema);
export default CategoryModel;
  