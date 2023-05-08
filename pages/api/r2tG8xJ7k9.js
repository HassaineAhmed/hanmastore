import {createOrder} from "../../prisma/playingWithData"
export default function placeOrder( req, res) {
    createOrder(req.body);
    res.status(200);
}
