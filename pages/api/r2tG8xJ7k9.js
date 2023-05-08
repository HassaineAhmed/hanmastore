import { placeOrder as addOrder } from "../../prisma/playingWithData"
export default function placeOrder( req, res) {
    addOrder(req.body);
    res.status(200);
}
