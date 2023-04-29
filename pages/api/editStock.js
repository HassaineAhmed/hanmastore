import nextConnect from "next-connect"
import multer from "multer"
import fse from "fs-extra";
import { updateClotheStock } from "../../prisma/playingWithData";
import { ConstructionOutlined } from "@mui/icons-material";


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
        let requestData = req.body
        const changedData = {}
        //this will delete the pervious pictures
        console.log(requestData)
        if (requestData.deletePreviousPictures) {
            console.log("deleteing some pics")
            for (let i = 1; i <= parseInt(requestData["previous_howManyPics"]); i++) {
                fse.unlink(`./public/images/${requestData.clotheType}s/${requestData.previous_name}/${i}.png`)
            }
            changedData.howManyPics = 0
        }
        if (requestData.previous_name != requestData.name) {
            fse.rmSync(`./public/images/${requestData.clotheType}s/${requestData.previous_name}`, { recursive: true, force: true });
            createFolder(requestData.clotheType, requestData.name)
        }
        if (req.files.length > 0) {
            console.log("got here")

            const firstPicName = requestData.deletePreviousPictures ? 1 : parseInt(requestData["previous_howManyPics"]) + 1;
            for (let i = 0, k = firstPicName; i < req.files.length; i++) {
                const file = req.files[i]
                if (file.fieldname == "pictures") {
                    const old = `./public/images/tempr/${file.originalname}`
                    const n = `./public/images/${requestData.clotheType}s/${requestData.name}/${k}.${req.files[i].mimetype.split("/")[1]}`
                    fse.moveSync(old, n, function (err) {
                        if (err) {
                            console.log("error puting the image in its folder ", err)
                            throw err
                        }
                    })
                    changedData.howManyPics = k
                    k += 1;

                }
            }
        }

        for (let key in requestData) {
            if (key.startsWith("previous") == false && key != "deletePreviousPictures" && key != "clotheType") {
                if (requestData[key] != requestData[`previous_${key}`]) {
                    // console.log("here is the ocndition ", parseInt(requestData[key]) === "NaN")
                    const a = parseInt(requestData[key])
                    console.log(isNaN(a))
                    isNaN(parseInt(requestData[key])) ? changedData[key] = (requestData[key]) : changedData[key] = parseInt(requestData[key])

                }

            }
        }
        console.log("this is the changedData", changedData)
        updateClotheStock(requestData.clotheType, requestData.previous_id, changedData)
        res.status(200).json({ "message": "the stock is added successfully" })

    })

export const config = {
    api: {
        bodyParser: false,
    },
};


export default handler;
