import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    subCategoryName: { type: String, required: true, unique: true },
    subCategorySlug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const SubCategory = mongoose.model("SubCategory", subCategorySchema);
export default SubCategory;
