import { createOrder } from "../../prisma/playingWithData";

export default function handler(req, res) {
 createOrder(req.body);
  res.status(200).json("Done!");

}
