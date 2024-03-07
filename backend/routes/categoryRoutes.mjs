import express from "express";
import expressAsyncHandler from "express-async-handler";
import Category from "../models/categoryModel.mjs";
import SubCategory from "../models/subCategoryModel.mjs";
import Product from "../models/productModel.mjs";

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

categoryRouter.get(
  "/getSubCategories",
  expressAsyncHandler(async (req, res) => {
    const subCategories = await SubCategory.find();
    res.send(subCategories);
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
      res.status(404).send({ message: "Грешка при креирање на подкатегорија" });
  })
);

categoryRouter.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = 10;
    const page = query.page || 1;
    const search = query.search;
    const collection = [];

    const categoryFilter =
      search && search.length > 0
        ? { categoryName: { $regex: search, $options: "i" } }
        : {};

    const subCategoryFilter =
      search && search.length > 0
        ? { subCategoryName: { $regex: search, $options: "i" } }
        : {};
    const categories = await Category.find({
      ...categoryFilter,
    });

    const subCategories = await SubCategory.find({
      ...subCategoryFilter,
    });

    collection.push(...categories);
    collection.push(...subCategories);

    const countCategories = collection.length;
    const start = pageSize * (page - 1);
    const result = [];
    for (let i = start; i < start + pageSize; i++) {
      if (collection[i] == null) break;
      result.push(collection[i]);
    }
    res.send({
      result,
      countCategories,
      page,
      pages: Math.ceil(countCategories / pageSize),
    });
  })
);

categoryRouter.put(
  "/edit/:id",
  expressAsyncHandler(async (req, res) => {
    const cat = await Category.findById(req.params.id);
    await SubCategory.updateMany(
      { category: cat.categoryName },
      { $set: { category: req.body.categoryName } }
    );
    await Product.updateMany(
      { category: cat.categoryName },
      { $set: { category: req.body.categoryName } }
    );
    await Category.updateOne(
      { _id: req.params.id },
      {
        $set: {
          categoryName: req.body.categoryName,
          categorySlug: req.body.categorySlug,
        },
      }
    );
    if (cat) res.status(200).send(cat);
    else {
      res.status(404).send({ message: "Category with that id doesnt exist" });
    }
  })
);

categoryRouter.put(
  "/subcategory/edit/:id",
  expressAsyncHandler(async (req, res) => {
    const sub = await SubCategory.findById(req.params.id);
    await Product.updateMany(
      { subCategory: sub.subCategoryName },
      { $set: { subCategory: req.body.subCategoryName } }
    );
    await SubCategory.updateOne(
      { _id: req.params.id },
      {
        $set: {
          subCategoryName: req.body.subCategoryName,
          subCategorySlug: req.body.subCategorySlug,
          category: req.body.category,
        },
      }
    );
    if (sub) res.status(200).send(sub);
    else {
      res.status(404).send({ message: "Category with that id doesnt exist" });
    }
  })
);

categoryRouter.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return res.status(404).send("Категоријата не е пронајдена");
  res.status(200).send(category);
});

categoryRouter.delete("/subcategory/:id", async (req, res) => {
  const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
  if (!subCategory)
    return res.status(404).send("Подкатегоријата не е пронајдена");
  res.status(200).send(subCategory);
});

categoryRouter.get("/:slug", async (req, res) => {
  let category = await SubCategory.findOne({
    subCategorySlug: req.params.slug,
  });
  if (!category) {
    category = await Category.findOne({ categorySlug: req.params.slug });
  }
  res.status(200).send(category);
});

export default categoryRouter;
