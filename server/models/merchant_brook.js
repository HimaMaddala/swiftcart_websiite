import mongoose from "mongoose";

const merchantschema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    amount: {
        type: String,
        required: true
    }
});

const merchant_brook_model = mongoose.model("merchant_brook", merchantschema);
export default merchant_brook_model;
