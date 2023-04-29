import { addField } from "../../prisma/playingWithData"


export default async function handler(req, res) {
    addField(req.body)
    // .then(async () => { await prisma.$disconnect() }).catch(async (e) => {
    // res.status(500).json("there was an error, the job hasn't been fulfilled")
    // console.error(e)
    // })
    res.status(200).json("The job has been fulfilled")
}

