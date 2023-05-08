import nextConnect from "next-connect";
import multer from "multer";
import fse from "fs-extra";
import { updateProductStock } from "../../prisma/playingWithData";

const createFolder = (productType, name) => {
  const destination = `./public/images/${productType}s/${name}`;
  fse.mkdirSync(destination, {}, function (err) {
    throw err;
  });
};

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/images/tempr/",
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

const handler = nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(upload.array("images"))
  .post(async (req, res) => {
    let requestData = req.body;
    const changedData = {};
    //this will delete the pervious pictures
    if (requestData.deletePreviousPictures == "on") {
      console.log("deleteing some pics");
      for (let i = 1; i <= parseInt(requestData["previous_howManyPics"]); i++) {
        fse.unlink(
          `./public/images/${requestData.productType}s/${requestData.previous_name}/${i}.png`
        );
      }
      changedData.howManyPics = 0;
    }
    if (requestData.previous_name != requestData.name) {
      // fse.rmSync(`./public/images/${requestData.productType}s/${requestData.previous_name}`, { recursive: true, force: true });
      fse.renameSync(
        `./public/images/${requestData.productType}s/${requestData.previous_name}`,
        `./public/images/${requestData.productType}s/${requestData.name}`,
        (err) => {
          if (err) {
            console.log(err);
          }
        }
      );

      //   createFolder(requestData.productType, requestData.name);
    }
    if (req.files.length > 0) {
      console.log("got here");

      const firstPicName =
        requestData.deletePreviousPictures == "on"
          ? 1
          : parseInt(requestData["previous_howManyPics"]) + 1;
      for (let i = 0, k = firstPicName; i < req.files.length; i++) {
        const file = req.files[i];
        if (file.fieldname == "images") {
          const old = `./public/images/tempr/${file.originalname}`;
          const n = `./public/images/${requestData.productType}s/${
            requestData.name
          }/${k}.${req.files[i].mimetype.split("/")[1]}`;
          fse.moveSync(old, n, function (err) {
            if (err) {
              console.log("error puting the image in its folder ", err);
              throw err;
            }
          });
          changedData.howManyPics = k;
          k += 1;
        }
      }
    }
    const arr = req.body;
    const name = arr.name;
    const price = arr.price;
    const trending = arr.trending;
    const isAvailable = arr.isAvailable;
    const productType = arr.productType;
    const previous_name = arr.previous_name;
    delete arr.name;
    delete arr.productType;
    delete arr.trending;
    delete arr.isAvailable;
    delete arr.previous_howManyPics;
    delete arr.previous_name;
    delete arr.price;
    console.log(price);
    console.log(parseInt(price));
    const data = {
      name: name,
      trending: trending,
      previous_name: previous_name,
      isAvailable: isAvailable,
      price: price,
      path: `/images/${productType}s/${name}`,
      howManyPics: changedData.howManyPics,
      productType: productType,
      dataArray: Object.entries(arr),
    };
    updateProductStock(data);
    res.status(200).json({ message: "product has been updated successfully" });
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
