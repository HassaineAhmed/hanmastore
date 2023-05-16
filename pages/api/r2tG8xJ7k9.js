import { createOrder } from "../../prisma/playingWithData";

export default async function placeOrder(req, res) {
    const order = await createOrder(req.body);
    if (order == null) {
        res.status(504)
    } else {
        console.log("finished succressfully :", order);
        res.status(200).json({ msg: "orderd has been confirmed" });
    }
}
