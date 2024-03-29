import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    images: { type: [String], default: [], required: true },
    dimensionImage: { type: String },
    schemaImage: { type: String },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    priceAssembly: { type: Number, required: true },
    countInStock: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
