import Stripe from "stripe";
import fetch from "node-fetch";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { session_id, url } = req.query;

  if (!session_id || !url) {
    return res.status(403).send("Payment required");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.payment_status !== "paid") {
    return res.status(403).send("Payment not verified");
  }

  const response = await fetch(url);
  const buffer = await response.arrayBuffer();

  res.setHeader(
    "Content-Disposition",
    "attachment; filename=island-moments.jpg"
  );

  res.send(Buffer.from(buffer));
}
