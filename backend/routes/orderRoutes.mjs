import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.mjs";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      orderItems: req.body.orderItems.map((x) => ({
        ...x,
        product: x._id,
        image: x.images[0],
      })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
      isPaid: req.body.isPaid,
      paidAt: req.body.paidAt,
      isConfirmed: req.body.isConfirmed,
      status: req.body.status,
    });
    console.log(newOrder);
    const order = await newOrder.save();
    res.status(201).send({ message: "New Order Created", order });
  })
);

orderRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = 10;
    const page = query.page || 1;
    const search = query.search;
    const status = query.status;

    const searchFilter =
      search && search.length > 0
        ? { _id: { $regex: search, $options: "i" } }
        : {};
    const statusFilter = status && status !== "all" ? { status } : {};

    const orders = await Order.find({
      ...searchFilter,
      ...statusFilter,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countOrders = orders.length;
    res.send({
      orders,
      countOrders,
      page,
      pages: Math.ceil(countOrders / pageSize),
    });
  })
);

orderRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = 10;
    const page = query.page || 1;

    const orders = await Order.find({ user: req.user._id })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countOrders = orders.length;
    res.send({
      orders,
      countOrders,
      page,
      pages: Math.ceil(countOrders / pageSize),
    });
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.find({ _id: req.params.id });
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Нарачката не е пронајдена" });
    }
  })
);

orderRouter.delete("/:id", async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).send("Нарачката не е пронајдена");
  res.status(200).send(order);
});

orderRouter.put("/:id", async (req, res) => {
  const updateFields = {};
  updateFields.status = req.body.status;
  if (req.body.status === "shipping") {
    updateFields.isConfirmed = true;
  } else if (req.body.status === "delivery") {
    (updateFields.isShipped = true), (updateFields.shippedAt = Date.now());
  } else if (req.body.status === "completed") {
    (updateFields.isDelivered = true), (updateFields.deliveredAt = Date.now());
    (updateFields.isPaid = true), (updateFields.paidAt = req.body.paidAt);
  }
  const order = await Order.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updateFields },
    { new: true }
  );
  if (order) res.status(200).send(order);
  else {
    res.status(404).send({ message: "Продуктот не е пронајден" });
  }
});

export default orderRouter;
