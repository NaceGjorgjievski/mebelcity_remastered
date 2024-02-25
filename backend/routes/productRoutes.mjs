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

export default productRouter;
