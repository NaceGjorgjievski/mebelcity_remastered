import express from "express";
import expressAsyncHandler from "express-async-handler";
import Category from "../models/categoryModel.mjs";
import SubCategory from "../models/subCategoryModel.mjs";

const categoryRouter = express.Router();

categoryRouter.get(
  "/getCategories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.send(categories);
  })
);

categoryRouter.post(
  "/addCategory",
  expressAsyncHandler(async (req, res) => {
    const newCategory = new Category({
      categoryName: req.body.category,
      categorySlug: req.body.categorySlug,
    });
    const category = await newCategory.save();
    if (category)
      res.status(201).send({ message: "New Category Created", category });
    else res.status(404).send({ message: "Грешка при креирање на категорија" });
  })
);

categoryRouter.post(
  "/addSubCategory",
  expressAsyncHandler(async (req, res) => {
    const newSubCategory = new SubCategory({
      subCategoryName: req.body.subCategory,
      subCategorySlug: req.body.subCategorySlug,
      category: req.body.selectedCategory,
    });
    const subCategory = await newSubCategory.save();
    if (subCategory)
      res.status(201).send({ message: "New Category Created", subCategory });
    else
      res
        .status(404)
        .send({ message: "Грешка при креирање на подкаегоријата" });
  })
);

export default categoryRouter;
