import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const paymentRouter = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET);

paymentRouter.post("/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  const { order } = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "mkd",
      product_data: {
        name: product.name,
        images: [`https://mebelcity.onrender.com/${product.images[0]}`],
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `https://mebelcity.onrender.com/order/${order}?payment=succesful`,
    cancel_url: `https://mebelcity.onrender.com/placeorder?payment=canceled&order=${order}`,
  });

  res.json({ id: session.id });
});

export default paymentRouter;
