import { createProductType } from "../../prisma/playingWithData"
import fse from "fs-extra";

export default function handler(req, res) {
    const createFolder = (productType) => {
        const destination = `./public/images/${productType}s`
        fse.mkdirSync(destination, {}, function (err) { throw err })
    }
    createFolder(req.body.name)
    createProductType(req.body)
    res.status(200).json({ "message": "product type has been created" })

}