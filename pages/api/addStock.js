import nextConnect from "next-connect"
import multer from "multer"
import fse from "fs-extra";
import { createClotheStock } from "../../prisma/playingWithData";


const createFolder = (clotheType, name) => {
  const destination = `./public/images/${clotheType}s/${name}`
  fse.mkdirSync(destination, {}, function (err) { throw err })
}

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/images/tempr/",
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
})

const handler = nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(upload.array("pictures"))
  .post(async (req, res) => {
    createFolder(req.body.clotheType, req.body.name)
    // put the image in it's folder and rename it.
    for (let i = 0, k = 1; i < req.files.length; i++) {
      const file = req.files[i]
      const old = `./public/images/tempr/${file.originalname}`
      const n = `./public/images/${req.body.clotheType}s/${req.body.name}/${k}.${req.files[i].mimetype.split("/")[1]}`
      if (file.fieldname == "pictures") {
        fse.moveSync(old, n, function (err) {
          if (err) {
            console.log("this is the error  ", err)
            throw err
          }
        })
        k += 1;
      }

    }
    let data = req.body
    data.howManyPics = req.files.length
    createClotheStock(data)

    res.json({ "message": "the stock is added successfully" })

  })


export const config = {
  api: {
    bodyParser: false,
  },
};


export default handler;
