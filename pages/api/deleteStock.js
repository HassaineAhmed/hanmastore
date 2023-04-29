import { deleteProduct } from "../../prisma/playingWithData"
import fse from "fs-extra";

export default function handler(req, res) {
    const method = req.body.method
    if (method == "delete") {
        const name = req.body.productName
        const type = req.body.productType
        fse.rmSync(`./public/images/${type}s/${name}`, { recursive: true, force: true });
        deleteProduct(type, name)
        res.status(200).json({ message: 'product is deleted successfully' })

    }


}