import { getOrders } from "../prisma/playingWithData"
export default function Page({ orders }) {
  function OrderComponent({ data }) {
    const { productName, fullName, phoneNumber, secondPhoneNumber, wilaya, fullAdress, quantity, size, codePromo, price } = data;
    return (<div className="grid bg-black p-5  rounded-2xl">
      <p className="text-xl text-white" ><span className="font-bold">  name </span>  : {fullName} </p>
      <p className="text-xl text-white" ><span className="font-bold">  wilaya </span>  : {wilaya} </p>
      <p className="text-xl text-white" ><span className="font-bold">  address </span>  : {fullAdress} </p>
      <p className="text-xl text-white" ><span className="font-bold">  phoneNumber </span>  : {phoneNumber} </p>
      { secondPhoneNumber != 0 && <p className="text-xl text-white" ><span className="font-bold"> customer's secondPhoneNumber </span>  : {secondPhoneNumber} </p> }
      <p className="text-xl text-white" ><span className="font-bold">  quantity </span>  : {quantity} </p>
      <p className="text-xl text-white" ><span className="font-bold">  size </span>  : {size} </p>
      <p className="text-xl text-white" ><span className="font-bold">  usedCodepromo </span>  : {codePromo} </p>
      <p className="text-xl text-white" ><span className="font-bold">  total price </span>  : {price} Dzd </p>
    </div>)

  }
  return <div className="grid justify-center gap-4 items-center">
    {orders.map((order, index) => <OrderComponent data={order} key={index} />)}
  </div>
}
export async function getStaticProps() {
  const orders = await getOrders();
  console.log("orders : ", orders);
  return { props: { orders } };
}
