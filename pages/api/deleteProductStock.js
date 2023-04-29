import fse from "fs-extra";
import rimraf from "rimraf";
import { deleteProductStock } from "../../prisma/playingWithData";
export default function handler(req, res) {
 deleteProductStock(req.body.name);
fse.rmSync(`./public/images/${req.body.productType}s/${req.body.name}`, {
   recursive: true,
   force: true,
  });
  res.status(200).json({ message: "product has been deleted successfully" });
}
