import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function createOrder({
    productName,
    fullName,
    phoneNumber,
    secondPhoneNumber,
    wilaya,
    fullAddress,
    quantity,
    size,
    price,

}) {
    await prisma.order.create({
        data: {

            product: { connect: { name: productName } },
            fullName: fullName,
            phoneNumber: parseInt(phoneNumber),
            secondPhoneNumber: parseInt(secondPhoneNumber),
            wilaya: wilaya,
            fullAdress: fullAddress,
            quantity: parseInt(quantity),
            size: size,
            color: "",
            price: price,
            createdAt: new Date(),
            codePromo: "",
        }
    })
}
    export default function placeOrder(req, res) {

        createOrder(req.body);
        res.status(200);
    }
