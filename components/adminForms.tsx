import Select from "@mui/material/Select";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react"
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import styles from "../styles/adminPage.module.css"
import { DOMAINE_URL } from "../pages/_app";


function CheckBoxField({ name, checked } : any) {
  return (
    <div className={`${styles.checkB} `}>
      <p className="ml-3 text-white peer-hover:text-black">{name}</p>

      {checked == "on" ? (
        <Checkbox className="m-1 px-2 peer " name={name} defaultChecked />
      ) : (
        <Checkbox className=" m-1 px-2 peer" name={name} />
      )}
    </div>
  );
}



export function SelectProductType({
  possibleProductsTypes,
  setChosenProductType,
  setChosenProductTypeData,
} : any) {
  const handleSelectChange = async (event : any) => {
    await fetch(`http://${DOMAINE_URL}/api/getProductTypeData`, {
      method: "POST",
      body: JSON.stringify({ name: event.target.value }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setChosenProductTypeData(JSON.parse(data));
      });

    setChosenProductType(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Product Type</InputLabel>
        <Select
          labelId="clotheType"
          id="clotheType"
          label="Product Type"
          value={""}
          onChange={handleSelectChange}
        >
          {possibleProductsTypes.map((type, index) => {
            return <MenuItem key={index} value={type.name}>{`${type.name}`}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
export function AddProductStockFrom({
  chosenProductType,
  chosenProductTypeData,
} : any) {
  async function handleSubmit(event : any) {
    event.preventDefault();
    const form = new FormData(event.target);

    // this for loop is here to just handle checkboxes when they are not checked and add them to formData because it wont do it by itself.
    for (let i in CheckBoxNames) {
      let found = false;
      for (const pair of form.entries()) {
        if (pair[0] == CheckBoxNames[i]) {
          found = true;
        }
      }
      if (found == false) {
        form.append(CheckBoxNames[i], "off");
      }
    }

    form.append("productType", chosenProductType);
    await fetch(`http://${DOMAINE_URL}/api/addProductStock`, {
      method: "POST",
      body: form,
    }).then((res) => {
      if (res.status == 200) {
        location.reload();
      }
    });
  }

  let TextFields = [
    <TextField
      key={"name"}
      name={"name"}
      id={"outlined-basic"}
      label={"name"}
      variant={"outlined"}
      type={"text"}
    />,
  ];
  let NumberFields = [
    <TextField
      key={"price"}
      name={"price"}
      id={"outlined-basic"}
      label={"price"}
      variant={"outlined"}
      type={"number"}
    />,
  ];
  let CheckBoxFields = [
    <CheckBoxField name={"isAvailable"} key={"isAvailable"} />,
  ];
  let CheckBoxNames = ["isAvailable"];
  let FileFields = [
    <div key={"images"}>
      <input
        type={"file"}
        id={"file"}
        name={"images"}
        className={styles.fileInput}
        multiple
      />
      <label htmlFor={"file"} className={styles.fileLabel} >
        Pick The Images
      </label>
    </div>,
  ];
  let ButtonFields = [];

  chosenProductTypeData.fields.map((field : any, index : any) => {
    if (field.htmlType == "text") {
      TextFields.push(
        <TextField
          key={index}
          name={field.name}
          id={"outlined-basic"}
          label={field.name}
          variant={"outlined"}
          type={field.htmlType}
        />
      );
    } else if (field.htmlType == "number") {
      NumberFields.push(
        <TextField
          key={index}
          name={field.name}
          id={"outlined-basic"}
          label={field.name}
          variant={"outlined"}
          type={field.htmlType}
        />
      );
    } else if (field.htmlType == "checkbox") {
      CheckBoxNames.push(field.name);
      CheckBoxFields.push(<CheckBoxField key={index} name={field.name} />);
    }
  });

  return (
    <>
      <span className="text-center my-[30px] text-3xl">
        Add A Product Stock
      </span>
      <MainForm
        TextFields={TextFields}
        FileFields={FileFields}
        NumberFields={NumberFields}
        CheckBoxFields={CheckBoxFields}
        ButtonFields={ButtonFields}
        handler={handleSubmit}
      />
    </>
  );
}
export function MainForm({
  TextFields,
  NumberFields,
  CheckBoxFields,
  ButtonFields,
  handler,
  FileFields,
} : any) {
  const [chosenColor , setChosenColor ] = useState("")
  const [chosenColorsList, setChosenColorsList ] = useState([])
  return (
    <form onSubmit={handler}>
      <div className="grid items-center justify-center gap-4">
        <div className="flex justify-center items-center ">{TextFields} </div>
        <div className="flex justify-center items-center gap-4">
          {" "}
          {NumberFields}{" "}
        </div>
        <div className="flex justify-center items-center gap-4">
          {" "}
          {FileFields}{" "}
        </div>
        <div className="flex justify-center items-center">
          {CheckBoxFields}{" "}
        </div>
        <div className="flex justify-center items-center"> {ButtonFields} </div>
        <button
          type={"submit"}
          className={`p-5 m-5 bg-[#ADE4DB] text-[black] rounded-xl  max-w-[220px]  min-w-[200px] justify-self-center`}
        >
          Confirm
        </button>
      </div>
    </form>
  );
}

export function ProductTypeForm({ isEdit, productsTypesData, fields} : any) {
  // const [type, setType] = useState("")
  const [chosenFields, setChosenFields] = useState([]);
  const [chosenProductType, setChosenProductType] = useState("");
  const [chosenProductTypeData, setChosenProductTypeData] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: event.target.name.value,
      fields: chosenFields,
    };
    await fetch(`http://${DOMAINE_URL}/api/addProductType`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status == 200) {
        location.reload();
      }
    });
  }

  return (
    <div className="grid">
      <div className="grid items-center justify-center">
        <span className="text-center my-[30px] text-3xl">
          Edit The Product Type
        </span>
        {isEdit ? (
          chosenProductType != "" ? (
            <EditForm
              chosenProductType={chosenProductType}
              setChosenFields={setChosenFields}
              chosenFields={chosenFields}
              handleSubmit={handleSubmit}
              isEdit={true}
              chosenProductTypeData={chosenProductTypeData}
              fields={fields}
            />
          ) : (
            <SelectProductType
              setChosenFields={setChosenFields}
              chosenProductType={chosenProductType}
              setChosenProductType={setChosenProductType}
              setChosenProductTypeData={setChosenProductTypeData}
              possibleProductsTypes={productsTypesData}
            />
          )
        ) : (
          <EditForm
            handleSubmit={handleSubmit}
            isEdit={false}
            chosenProductTypeData={chosenProductTypeData}
            fields={fields}
          />
        )}
      </div>
      {/* 41530730 */}
    </div>
  );
}

export function SelectProductType2({
  setChosenFields,
  chosenProductType,
  possibleProductsTypes,
  setChosenProductType,
  setChosenProductTypeData,
} : any) {
  const handleSelectChange = (event) => {
    setChosenProductType(event.target.value);
    for (let i in possibleProductsTypes) {
      if (possibleProductsTypes[i].name == event.target.value) {
        setChosenFields(
          possibleProductsTypes[i].fields.map((field) => field.name)
        );
        setChosenProductTypeData(possibleProductsTypes[i]);
      }
    }
  };
  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Product Type</InputLabel>
        <Select
          labelId="clotheType"
          id="clotheType"
          value={chosenProductType}
          label="Product Type"
          onChange={handleSelectChange}
        >
          {possibleProductsTypes.map((type, index) => {
            return (
              <MenuItem
                key={index}
                value={type.name}
              >{`${type.name}`}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

function EditForm({
  chosenProductType,
  isEdit,
  chosenProductTypeData,
  fields,
  chosenFields,
  setChosenFields,
} : any) {
  const [nameValue, setNameValue] = useState(chosenProductType);
  const oldFields = chosenProductTypeData.fields.map((field : any) => field.name);
  const [chosenColor , setChosenColor ] = useState()
  const [chosenColorsList, setChosenColorsList ] = useState([])

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData();
    form.append("oldName", chosenProductType);
    form.append("newName", event.target.name.value);
    const data = {
      oldName: chosenProductType,
      newName: event.target.name.value,
      fields: chosenFields,
      oldFields: oldFields,
    };

    form.append("chosenFields", chosenFields);
    await fetch(`http://${DOMAINE_URL}/api/editProductType`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status == 200) {
        location.reload();
      }
    });
  }
  async function handleDelete(event) {
    event.preventDefault();
    await fetch(`http://${DOMAINE_URL}/api/deleteProductType`, {
      method: "POST",
      body: JSON.stringify({ name: chosenProductType }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status == 200) {
        location.reload();
      }
    });
  }
  const [fieldType, setFieldType] = useState("");
  return (
    <div className="grid items-center justify-center">
      <form
        className="justify-center items-center flex flex-col"
        onSubmit={handleSubmit}
      >
        <div className="max-w-[300px]">
          {isEdit ? (
            <TextField
              className="m-5 grow-0"
              id={"outlined-basic"}
              label={"name"}
              variant="outlined"
              type={"text"}
              name={"name"}
              required
              value={nameValue}
              onChange={(event) => setNameValue(event.target.value)}
            />
          ) : (
            <TextField
              className="m-5 grow-0"
              id={"outlined-basic"}
              label={"name"}
              variant="outlined"
             type={"text"}
              name={"name"}
              required
            />
          )}
        </div>
        <div className=" grid justify-center items-center gap-8">
        <div className="grow-0 max-w-[300px]">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                name={"selectType"}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fieldType}
                onChange={(event) => {
                  setFieldType(event.target.value);
                  setChosenFields((prev) => [
                    ...prev.filter((i) =>
                      i == event.target.value ? false : true
                    ),
                    event.target.value,
                  ]);
                }}
                label="Age"
              >
                {fields.map((field, i) => {
                  return (
                    <MenuItem key={i} value={field.name}>
                      {field.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </div>
        </div>
        <div className="flex items-center justify-center">
          {chosenFields.map((type, index) => {
            return (
              <div className="m-2 p-3 rounded-lg bg-[#ADE4DB]" key={index}>
                {type}
                <ClearIcon
                  onClick={(event) => {
                    setChosenFields((prev) =>
                      prev
                        .filter((u) => (u == type ? false : true))
                        .map((i) => i)
                    );
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="justify-self-center">
          <button
            onClick={handleDelete}
            className={`p-3 m-5 bg-[red] text-[white] font-bold text-xl rounded-xl  max-w-[220px]  min-w-[200px] justify-self-center`}
            type={"button"}
          >
            Delete {chosenProductType}
          </button>
          {/* <button
            onClick={handleSubmit}
            className={`p-5 m-5 bg-formColor2 text-[black] rounded-xl  max-w-[220px]  min-w-[200px] justify-self-center`}
            type={"button"}
          >
            Confirm
          </button> */}
          <input
            type={"submit"}
            className={`p-3 m-5 bg-[#ADE4DB]  font-bold text-xl text-[black] rounded-xl  max-w-[220px]  min-w-[200px] justify-self-center`}
          />
        </div>
      </form>
    </div>
  );
}
export function EditProductStockFrom({ chosenProductStockData }) {
  const [name, setName] = useState(chosenProductStockData.name);
  const [price, setPrice] = useState(chosenProductStockData.price);
  async function handleDelete(event) {
    event.preventDefault();
    await fetch(`http://${DOMAINE_URL}/api/deleteProductStock`, {
      method: "POST",
      body: JSON.stringify({
        name: chosenProductStockData.name,
        productType: chosenProductStockData.productType.name,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status == 200) {
        location.reload();
      }
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    // this for loop is here to just handle checkboxes when they are not checked and add them to formData because it wont do it by itself.
    for (let i in CheckBoxNames) {
      let found = false;
      for (const pair of form.entries()) {
        if (pair[0] == CheckBoxNames[i]) {
          found = true;
        }
      }
      if (found == false) {
        form.append(CheckBoxNames[i], "off");
      }
    }

    form.append("productType", chosenProductStockData.productTypeName);
    form.append("previous_howManyPics", chosenProductStockData.howManyPics);
    form.append("previous_name", chosenProductStockData.name);

    await fetch(`http://${DOMAINE_URL}/api/editProductStock`, {
      method: "POST",
      body: form,
    }).then((res) => {
      if (res.status == 200) {
        location.reload();
      }
    });
  }
  let TextFields = [
    <TextField
      value={name}
      onChange={(event) => setName(event.target.value)}
      key={"name"}
      name={"name"}
      id={"outlined-basic"}
      label={"name"}
      variant={"outlined"}
      type={"text"}
    />,
  ];
  let NumberFields = [
    <TextField
      value={price}
     onChange={(event) => setPrice(event.target.value)}
      key={"price"}
      name={"price"}
      id={"outlined-basic"}
      label={"number"}
      variant={"outlined"}
      type={"number"}
    />,
  ];
  let CheckBoxFields = [
    <CheckBoxField
      name={"isAvailable"}
      key={"isAvailable"}
      checked={chosenProductStockData.isAvailable == true ? "on" : "off"}
    />,
    <CheckBoxField
      name={"deletePreviousPictures"}
      key={"deletePreviousPictures"}
    />,
    <CheckBoxField
      name={"trending"}
      key={"trending"}
      checked={chosenProductStockData.trending == true ? "on" : "off"}
    />,
  ];
  let CheckBoxNames = ["isAvailable", "trending"];
  let FileFields = [
    <div key={"images"}>
      <input
        type={"file"}
        id={"file"}
        name={"images"}
        className={styles.fileInput}
        multiple
      />
      <label htmlFor={"file"} className={styles.fileLabel}>
        Pick The Images
      </label>
    </div>,
  ];
  let ButtonFields = [
    <button
      key={"delete"}
      onClick={handleDelete}
      className={`p-5 m-5 bg-[red] text-[black] rounded-xl  max-w-[220px]  min-w-[200px] justify-self-center`}
    >
      Delete Product
    </button>,
  ];
  chosenProductStockData.ProductData.map((element, index) => {
    const field = element.field;
    const [initialValue, setInitialValue] = useState(
      element.value[field.jsType]
    );

    if (field.htmlType == "text") {
      TextFields.push(
        <TextField
          key={index}
          name={field.name}
          id={"outlined-basic"}
          label={field.name}
          variant={"outlined"}
          type={field.htmlType}
          value={initialValue}
          onChange={(event) => {
            setInitialValue(event.target.value);
          }}
        />
      );
    } else if (field.htmlType == "number") {
      NumberFields.push(
        <TextField
          key={index}
          name={field.name}
          id={"outlined-basic"}
          label={field.name}
          variant={"outlined"}
          type={field.htmlType}
          value={initialValue}
          onChange={(event) => {
            setInitialValue(event.target.value);
          }}
        />
      );
    } else if (field.htmlType == "checkbox") {
      CheckBoxNames.push(field.name);

      CheckBoxFields.push(
        <CheckBoxField key={index} name={field.name} checked={initialValue} />
      );
    } else if (field.htmlType == "image") {
      FileFields.push(
        <div key={index}>
          <input
            type={"file"}
            id={"file"}
            name={"images"}
            className={styles.fileInput}
            multiple
          />
          <label htmlFor={"file"} className={styles.fileLabel} >
            Pick The Images
          </label>
        </div>
      );
    }
  });
  return (
    <>
      <span className="text-center my-[30px] text-3xl">
        EditA Product Stock
      </span>
      <MainForm
        TextFields={TextFields}
        FileFields={FileFields}
        NumberFields={NumberFields}
        CheckBoxFields={CheckBoxFields}
        ButtonFields={ButtonFields}
        handler={handleSubmit}
      />
    </>
  );
}
export function SelectProductStock({
  possibleProductsStocks,
  setChosenProductStock,
  setChosenProductStockData,
}) {
  const handleSelectChange = async (event) => {
    await fetch(`http://${DOMAINE_URL}/api/getProductStockData`, {
      method: "POST",
      body: JSON.stringify({ name: event.target.value }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setChosenProductStockData(JSON.parse(data));
      });

    setChosenProductStock(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Product Type</InputLabel>
        <Select
          labelId="clotheType"
          id="clotheType"
          label="Product Type"
          value={""}
          onChange={handleSelectChange}
        >
          {possibleProductsStocks.map((type, index) => {
            return <MenuItem key={index} value={type}>{`${type}`}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
