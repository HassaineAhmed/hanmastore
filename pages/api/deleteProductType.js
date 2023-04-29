import { deleteProductType } from "../../prisma/playingWithData";
export default function handler(req, res) {
    deleteProductType(req.body.name)
    res.status(200).json({ message: "product type has been deleted" })
}