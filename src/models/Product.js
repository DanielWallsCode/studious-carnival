import { Schema,model } from "mongoose";


const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    category: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },

    imgUrl: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Product',productSchema);