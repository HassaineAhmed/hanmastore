import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function createOrder({
  productName,
  fullName,
  phoneNumber,
  secondPhoneNumber,
  wilaya,
  fullAddress,
  quantity,
  size,
  price,
  //  reducedPrice,
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
      let unUpdatedCodePromo = await prisma.codePromo.findUnique({ where: { codePromo: codePromo } })
      unUpdatedCodePromo != null && await prisma.codePromo.update({ where: { codePromo: codePromo }, data: { profit: unUpdatedCodePromo.profit + 1000 * quantity * (unUpdatedCodePromo.percentage / 100) } })
    }
    console.log("nrmlm fad");
    console.log("here is the order :", order);
    return order
  } catch (e) {
    console.log("error : ", e);
    return null;
  }
}
export async function getCodePromos() {
  const codePromos = await prisma.codePromo.findMany();
  return codePromos;
}
export async function getColors() {
  const colors = await prisma.color.findMany()
  return colors.map(color => color.color);
}
export async function addField(data) {
  let jsType;
  if (data.type == "number") {
    jsType = "float";
  } else {
    jsType = "string";
  }

  const field = await prisma.field.create({
    data: {
      name: data.name,
      htmlType: data.type,
      jsType: jsType,
    },
  });
}

export async function getFields() {
  const fields = await prisma.field.findMany();
  return fields;
}

export async function getField(name) {
  const field = await prisma.field.findUnique({ where: { name: name } });
  return field;
}
export async function createProductType(data) {
  const productType = prisma.productType.create({
    data: {
      name: data.name,
      fields: {
        connect: data.fields.map((fieldName) => {
          return { name: fieldName };
        }),
      },
    },
  });

  return productType;
}

export async function getProductsTypes() {
  const types = await prisma.productType.findMany({
    include: {
      fields: true,
    },
  });
  return types;
}

export async function getProductsTypesWithOutFields() {
  const types = await prisma.productType.findMany({
    select: {
      name: true,
    },
  });
  return types;
}

export async function deleteProductType(name) {
  const productType = await prisma.productType.delete({
    where: {
      name: name,
    },
  });
}
// try {
//     await client.user.create({ data: { email: 'alreadyexisting@mail.com' } })
//   } catch (e) {
//     if (e instanceof Prisma.PrismaClientKnownRequestError) {
//       // The .code property can be accessed in a type-safe manner
//       if (e.code === 'P2002') {
//         console.log(
//           'There is a unique constraint violation, a new user cannot be created with this email'
//         )
//       }
//     }
//     throw e

export async function editProductType({
  oldName,
  newName,
  fieldsToDisconnect,
  fieldsToConnect,
}) {
  const type = await prisma.productType.update({
    where: { name: oldName },
    data: {
      name: newName,
      fields: {
        disconnect: fieldsToDisconnect.map((element) => {
          return { name: element };
        }),
        connect: fieldsToConnect.map((element) => {
          return { name: element };
        }),
      },
    },
  });
}
export async function getProductTypeData(name) {
  const data = await prisma.productType.findUnique({
    where: { name: name },
    include: {
      fields: true,
    },
  });
  return data;
}

export async function createProductStock(formData: any) {
  const fields = await getFields();
  const arr = formData.dataArray.map((element: any) => {
    for (let i in fields) {
      if (fields[i].name == element[0]) {
        return [...element, fields[i].jsType];
      }
    }
  });
  function TheRealGreatParseInt(value, dataType) {
    if (dataType == "int" || dataType == "float") {
      return parseInt(value);
    } else {
      return value;
    }
  }
  const productStock = await prisma.product.create({
    data: {
      name: formData.name,
      isAvailable: formData.isAvailable == "on" ? true : false,
      path: formData.path,
      price: parseInt(formData.price),
      howManyPics: formData.howManyPics,
      productType: { connect: { name: formData.productType } },
      ProductData: {
        create: arr.map((element) => {
          return {
            field: { connect: { name: element[0] } },
            value: {
              create: {
                [element[2]]: TheRealGreatParseInt(element[1], [element[2]]),
              },
            },
          };
        }),
      },
    },
  });
}

export async function updateProductStock(formData) {
  const fields = await getFields();
  const arr = formData.dataArray.map((element) => {
    for (let i in fields) {
      if (fields[i].name == element[0]) {
        return [...element, fields[i].jsType, fields[i].id];
      }
    }
  });
  function TheRealGreatParseInt(value, dataType) {
    if (dataType == "int" || dataType == "float") {
      return parseInt(value);
    } else {
      return value;
    }
  }
  const productStock = await prisma.product.update({
    where: { name: formData.previous_name },
    data: {
      name: formData.name,
      isAvailable: formData.isAvailable == "on" ? true : false,
      trending: formData.trending == "on" ? true : false,
      price: parseInt(formData.price),
      path: formData.path,
      howManyPics: formData.howManyPics,
      // ProductData: {
      //     upsert: arr.map(element => { return { where: { id: element[3] }, update: { value: { upsert: { update: { [element[2]]: element[1] }, create: { [element[2]]: element[1] } } } } } })
      // }
      // ProdductData: { connect: arr.map(element => { return { field: { connect: { name: element[0] } }, value: { connect: { [element[2]]: TheRealGreatParseInt(element[1], [element[2]]) } } } }) }
    },
  });

  let productDataList = await prisma.product.findUnique({
    where: {
      name: formData.previous_name,
    },
    select: {
      ProductData: true,
    },
  });
  if (productDataList != null) {
    for (let i in productDataList.ProductData) {
      for (let a in arr) {
        if (arr[a][0] == productDataList.ProductData[i].fieldName) {
          const dt = await prisma.dataType.update({
            where: {
              id: productDataList.ProductData[i].dataTypeId,
            },
            data: {
              [arr[a][2]]:
                isNaN(parseInt(arr[a][1])) == true
                  ? arr[a][1]
                  : parseInt(arr[a][1]),
            },
          });
        }
      }
    }
  }
}
// const dataType = await prisma.dataType.update({
// })

export async function deleteProductStock(name) {
  const product = await prisma.product.delete({
    where: {
      name: name,
    },
  });
}

export async function getProductsStocks() {
  const data = await prisma.product.findMany();
  return data;
}
export async function getProducts(category) {
  const data = await prisma.product.findMany({
    where: { productTypeName: category },
  });
  return data;
}
export async function getProductStockData(name) {
  const data = await prisma.product.findUnique({
    where: {
      name: name,
    },
    include: {
      // productType: {
      //     select: { name: true, fields: true }

      // },
      colors: { select: { color: true, hexCode: true } },
      productType: { select: { name: true } },
      ProductData: { select: { field: true, value: true } },
    },
  });
  return data;
}

export async function getTrendingProductsStocks() {
  const productsTypes = await getProductsTypesWithOutFields();
  let trendingProducts = {};
  for (let i in productsTypes) {
    trendingProducts[productsTypes[i].name] = await prisma.product.findMany({
      where: {
        trending: true,
        productTypeName: productsTypes[i].name,
      },
    });
  }
  return await prisma.product.findMany({ where: { trending: true } });
}

// create a new Clothe instance stock in the database
export async function updateClotheStock(clotheType, id, changedData) {
  const newData = await prisma[clotheType].update({
    where: {
      id: parseInt(id),
    },
    data: { ...changedData },
  });
  console.log("data is updated succesffuly");
}

export async function getProduct(productType, productName) {
  const product = await prisma[productType].findUnique({
    where: {
      name_path: {
        name: productName,
        path: `/images/${productType}s/${productName}`,
      },
    },
  });
  return product;
}

// export async function getFields() {
//     const clothesTypes = await prisma.clothesTypes.findMany()
//     let fieldsArray = {}
//     for (let i = 0; i < clothesTypes.length; i++) {
//         const productsFields = await prisma.productsFields.findUnique(
//             {
//                 where: {
//                     clotheTypeName: clothesTypes[i].type
//                 },
//                 include: {
//                     fields: true
//                 }
//             }
//         )
//         fieldsArray[clothesTypes[i].type] = productsFields.fields
//     }

//     return fieldsArray
// }

export async function deleteProduct(productType, productName) {
  const deletedProduct = await prisma[productType].delete({
    where: {
      name_path: {
        name: productName,
        path: `/images/${productType}s/${productName}`,
      },
    },
  });
  console.log("product is deleted sucessfully");
}
/*
export async function createOrder({
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
      codePromo : "",
    },
  });
}
*/
