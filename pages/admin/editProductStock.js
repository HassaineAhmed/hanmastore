import { getProductsStocks } from "../../prisma/playingWithData";
import {
  SelectProductStock,
  EditProductStockFrom,
} from "../../components/adminForms";
import { useState } from "react";
export default function EditProductStock({ possibleProductsStocks }) {
  possibleProductsStocks = possibleProductsStocks.map((stock) => stock.name);
  const [chosenProductStock, setChosenProductStock] = useState("");
  const [chosenProductStockData, setChosenProductStockData] = useState();

  return (
    <div className="grid justify-center items-center my-[50px]">
      {chosenProductStock == "" ? (
        <SelectProductStock
          possibleProductsStocks={possibleProductsStocks}
          setChosenProductStockData={setChosenProductStockData}
          setChosenProductStock={setChosenProductStock}
        />
      ) : (
        <EditProductStockFrom chosenProductStockData={chosenProductStockData} />
      )}
    </div>
  );
}
export async function getStaticProps() {
  const possibleProductsStocks = await getProductsStocks();
  return { props: { possibleProductsStocks } };
}
