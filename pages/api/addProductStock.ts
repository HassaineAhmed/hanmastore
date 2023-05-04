import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import fse from "fs-extra";
import { createProductStock } from "../../prisma/playingWithData";

const createFolder = (productType, name) => {
  const destination = `./public/images/${productType}s/${name}`;
  fse.mkdirSync(destination, {}, function(err) {
    throw err;
  });
};

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/images/tempr/",
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});
interface ExtendedRequest {
  files: any;
  body: any;
}
const handler = nextConnect<ExtendedRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.writeHead(500)
    res.end("Something Broke!");
  },
  onNoMatch: (req, res) => {
    res.writeHead(404)
    res.end("Page is not found");
  },
})
  .use(upload.array("images"))
  .post(async (req, res) => {
    createFolder(req.body.productType, req.body.name);
    // put the image in it's folder and rename it.
    for (let i = 0, k = 1; i < req.files.length; i++) {
      const file = req.files[i];
      const old = `./public/images/tempr/${file.originalname}`;
      const n = `./public/images/${req.body.productType}s/${req.body.name
        }/${k}.${req.files[i].mimetype.split("/")[1]}`;
      if (file.fieldname == "images") {
        fse.moveSync(old, n, function(err) {
          if (err) {
            console.log("this is the error  ", err);
            throw err;
          }
        });
        k += 1;
      }
    }

    // cooking the data for prisma and arr is just random
    const arr = req.body;
    const name = arr.name;
    const isAvailable = arr.isAvailable;
    const productType = arr.productType;
    const price = arr.price;
    delete arr.name;
    delete arr.productType;
    delete arr.isAvailable;
    delete arr.price;

    const howManyPics = req.files.length;
    const data = {
      name: name,
      previous_name: req.body.previous_name,
      isAvailable: isAvailable,
      path: `/images/${productType}s/${name}`,
      price: price,
      howManyPics: howManyPics,
      productType: productType,
      dataArray: Object.entries(arr),
    };
    createProductStock(data);
    res.status(200).json({ message: "the product is added successfully" });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
