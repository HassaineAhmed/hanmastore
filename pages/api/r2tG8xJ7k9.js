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
    reducedPrice,
    codePromo,
    usesCodePromo,

}) {
    try {
        const order = await prisma.order.create({
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
                codePromo: codePromo,
            }
        })
        if (usesCodePromo) {
            const unUpdatedCodePromo = await prisma.codePromo.findUnique({ where: { codePromo: codePromo } })
            await prisma.codePromo.update({ where: { codePromo: codePromo }, data: { profit: unUpdatedCodePromo.profit + 1000 * quantity * (unUpdatedCodePromo.percentage / 100) } })
        }
        console.log("nrmlm fad");
        console.log("here is the order :",order);
        return order
    } catch (e) {
        console.log("error : ",e);
        return null;
    }
}
export default function placeOrder(req, res) {
    const order = createOrder(req.body);
    if (order == null) {
        res.status(504)
    } else {
        console.log("finished succressfully :", order );
        res.status(200).json({ msg: "orderd has been confirmed" });
    }
}
