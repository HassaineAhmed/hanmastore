import { AddProductStockFrom, SelectProductType } from "../../components/adminForms"
import { useState} from "react"
import { getProductsTypes } from "../../prisma/playingWithData"


export default function AddProductStock({ productsTypes }) {
    const possibleProductsTypes = productsTypes.map(type => type.name)

    const [chosenProductType, setChosenProductType] = useState("")
    const [chosenProductTypeData, setChosenProductTypeData] = useState()
    return (<div className="grid justify-center items-center my-[50px]">
        {
            chosenProductType == "" ?
                <SelectProductType
                    possibleProductsTypes={productsTypes}
                    setChosenProductType={setChosenProductType}
                    setChosenProductTypeData={setChosenProductTypeData}
                />
                :
                <AddProductStockFrom chosenProductType={chosenProductType} chosenProductTypeData={chosenProductTypeData} />
        }
    </div>)
}


export async function getStaticProps() {
    const productsTypes = await getProductsTypes()
    return { props: { productsTypes } }

}
