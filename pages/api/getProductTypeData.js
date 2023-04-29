import { getProductTypeData } from "../../prisma/playingWithData";

export default async function handler(req, res) {
  const data = await getProductTypeData(req.body.name)
   res.setHeader('Content-Type', 'application/json').status(200).json(JSON.stringify(data))
}
