import { getProductsTypes,getColors, getFields } from "../../prisma/playingWithData";
import { ProductTypeForm } from "../../components/adminForms";
export default function EditProductType({colors, productsTypes, fields }) {
  return (
    <div>
      <ProductTypeForm
        isEdit={true}
        productsTypesData={productsTypes}
        fields={fields}
        colors={colors}
      />
    </div>
  );
}

export async function getStaticProps() {
  const productsTypes = await getProductsTypes();
  const fields = await getFields();
  const colors = await getColors();
  return { props: { productsTypes, fields, colors } };
}
