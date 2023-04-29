import { editProductType } from "../../prisma/playingWithData";
import fs from "fs";

export default async function handler(req, res) {
  function findIndexOfElement(arr, value) {
    let isFound = false;
    let index;
    for (let i in arr) {
      if (arr[i] == value) {
        isFound = true;
        index = i;
      }
    }
    if (isFound) {
      return index;
    } else {
      return -1;
    }
  }
  const fieldsToDisconnect = req.body.oldFields
    .filter((element) =>
      findIndexOfElement(req.body.fields, element) == -1 ? true : false
    )
    .map((element) => element);
  const fieldsToConnect = req.body.fields
    .filter((element) =>
      findIndexOfElement(req.body.oldFields, element) == -1 ? true : false
    )
    .map((element) => element);
  const data = {
    fieldsToConnect: fieldsToConnect,
    fieldsToDisconnect: fieldsToDisconnect,
    oldName: req.body.oldName,
    newName: req.body.newName,
  };
  fs.rename(`./public/images/${req.body.oldName}s` , `./public/images/${req.body.newName}s`, function (err) { if(err) { console.log(err) } else { console.log("renamed succesfully"); } } );
  editProductType(data);
  res.status(200).json({ message: "hello there thumnder how is your day" });
}
// export const config = {
//     api: {
//         bodyParser: false
//     }
// }
