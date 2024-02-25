import express, { query } from "express";
import Product from "../models/productModel.js";
import multer from "multer";
import expressAsyncHandler from "express-async-handler";

const productRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "frontend/public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const multipleUpload = upload.fields([
  { name: "images" },
  { name: "dimensionImage", maxCount: 1 },
  { name: "schemaImage", maxCount: 1 },
]);

productRouter.post(
  "/add",
  multipleUpload,
  expressAsyncHandler(async (req, res) => {
    let tmp = [];
    for (let i = 0; i < req.files.images.length; i++) {
      tmp.push(`/uploads/${req.files.images[i].originalname}`);
    }

    const newProduct = new Product({
      name: req.body.name,
      slug: req.body.slug,
      images: tmp,
      dimensionImage: `/uploads/${req.files.dimensionImage[0].originalname}`,
      schemaImage: `/uploads/${req.files.schemaImage[0].originalname}`,
      category: req.body.selectedCategory,
      subCategory: req.body.selectedSubCategory,
      description: req.body.description,
      price: req.body.price,
      priceAssembly: req.body.priceAssembly,
      countInStock: req.body.countInStock,
    });
    const product = await newProduct.save();

    if (product)
      res.status(201).send({ message: "New Product Created", product });
    else res.status(404).send({ message: "Грешка при додавање производ" });
  })
);

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = 20;
    const page = query.page || 1;
    const category = query.category;
    const subCategory = query.subCategory;
    const order = query.order;
    const search = query.search;

    const searchFilter =
      search && search.length > 0
        ? { name: { $regex: search, $options: "i" } }
        : {};
    const categoryFilter = category && category !== "all" ? { category } : {};
    const subCategoryFilter =
      subCategory && subCategory !== "all" ? { subCategory } : {};
    const sortOrder =
      order === "lowFirst"
        ? { price: 1 }
        : order === "highFirst"
        ? { price: -1 }
        : { createdAt: -1 };
    const products = await Product.find({
      ...searchFilter,
      ...categoryFilter,
      ...subCategoryFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...searchFilter,
      ...categoryFilter,
      ...subCategoryFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });

    res.status(200).send(query);
  })
);

productRouter.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).send("Продуктот не е пронајден");
  res.status(200).send(product);
});

export default productRouter;
