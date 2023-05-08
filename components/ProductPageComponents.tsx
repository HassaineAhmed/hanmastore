import { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Image from "next/image";
import styles from "../../styles/productPage.module.css";
import TextField from "@mui/material/TextField";
import { FaPlus, FaMinus } from "react-icons/fa";
import CloseIcon from "@mui/icons-material/Close";

const wilayasList = [
  "Adrar - 01",
  "Chlef - 02",
  "Laghouat - 03",
  "Oum El Bouaghi - 04",
  "Batna - 05",
  "Béjaïa - 06",
  "Biskra - 07",
  "Béchar - 08",
  "Blida - 09",
  "Bouira - 10",
  "Tamanghasset - 11",
  "Tébessa - 12",
  "Tlemcen - 13",
  "Tiaret - 14",
  "Tizi Ouzou - 15",
  "Algiers - 16",
  "Djelfa - 17",
  "Jijel - 18",
  "Sétif - 19",
  "Saïda - 20",
  "Skikda - 21",
  "Sidi Bel Abbès - 22",
  "Annaba - 23",
  "Guelma - 24",
  "Constantine - 25",
  "Médéa - 26",
  "Mostaganem - 27",
  "M'Sila - 28",
  "Mascara - 29",
  "Ouargla - 30",
  "Oran - 31",
  "El Bayadh - 32",
  "Illizi - 33",
  "Bordj Bou Arréridj - 34",
  "Boumerdès - 35",
  "El Tarf - 36",
  "Tindouf - 37",
  "Tissemsilt - 38",
  "El Oued - 39",
  "Khenchela - 40",
  "Souk Ahras - 41",
  "Tipaza - 42",
  "Mila - 43",
  "Aïn Defla - 44",
  "Naâma - 45",
  "Aïn Témouchent - 46",
  "Ghardaïa - 47",
  "Relizane - 48",
];

export function BuyForm({
  size,
  chosenColor,
  productName,
  productPrice,
}) {
  console.log(productPrice);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [secondPhoneNumber, setSecondPhoneNumber] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [showOrderNotification, setShowOrderNotification] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [codePromo, setCodePromo] = useState("");
  const [price, setPrice] = useState(0);
  useEffect(() => {
    {
      wilaya == "Algiers - 16"
        ? setPrice(quantity * parseInt(productPrice) + 400)
        : setPrice(quantity * parseInt(productPrice) + 700)
    }
  }
    , [wilaya, quantity])
  async function handleSubmit(event) {
    event.preventDefault();
    console.log("clicked")
    const data = {
      productName: productName,
      fullName: name,
      phoneNumber: phoneNumber,
      secondPhoneNumber: secondPhoneNumber ? secondPhoneNumber : 0,
      wilaya: wilaya,
      fullAddress: fullAddress,
      quantity: quantity,
      size: size,
      codePromo: codePromo,
      price: price,
    };
    await fetch("http://localhost:3000/api/r2tG8xJ7k9", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
  const [value, setValue] = useState(1);
  // this concerns handling the quantity
  const NumberInput = () => {
    const increment = () => {
      const newValue = value + 1;
      setQuantity(prev => prev + 1)
      setValue(newValue);
      //onChange && onChange(newValue);
    };

    const decrement = () => {
      if (value > 1) {
        const newValue = value - 1;
        setValue(newValue);
        setQuantity(prev => prev > 1 ? prev - 1 : prev)
        // onChange && onChange(newValue);
      }
    };

    return (
      <div className="flex grow-0 justify-center items-center gap-2">
        <div className="flex border-[2px] px-[10px] gap-2">
          <button onClick={decrement}>
            <FaMinus />
          </button>
          <span className="border-x-2 px-[8px] text-[25px]"> {quantity} </span>
          <button onClick={increment}>
            <FaPlus />
          </button>
        </div>
      </div>
    );
  };
  function SelectListBox({ list, setState, state }) {
    return (
      <Box >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Wilaya</InputLabel>

          <Select
            labelId="wilaya"
            id="wilaya"
            label="wilaya"
            value={state}
            onChange={(event) => setState(event.target.value)}
            required
          >
            {list.map((type, index) => {
              return (
                <MenuItem
                  key={index}
                  className={"text-[25px]"}
                  value={type}
                >{`${type}`}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }

  return (
    <div className=" font-bebas_neue  bg-[#efefef] top-[5%] left-[3%] rounded-2xl bg-[white] grid items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className={"grid justify-center w-[100vw] items-center"}
      >
        <span className="text-[45px] my-5">Complete The Order</span>
        <div className=" gap-6 grid justify-center items-center">
          <TextField
            className="my-5 "
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            id={"outlined-basic"}
            label={"Full Name"}
            variant="outlined"
            type={"text"}
            name={"name"}
            required
          />
          <TextField
            className="my-5"
            name={"phoneNumber"}
            value={phoneNumber}
            onChange={(event) => {
              setPhoneNumber(event.target.value);
            }}
            id={"outlined-basic"}
            label={"Phone Number"}
            variant={"outlined"}
            type={"number"}
            required
          />
          <TextField
            className="my-5"
            name={"secondPhoneNumber"}
            value={secondPhoneNumber}
            onChange={(event) => {
              setSecondPhoneNumber(event.target.value);
            }}
            id={"outlined-basic"}
            label={"Second Phone Number (optional)"}
            variant={"outlined"}
            type={"number"}
          />
          <SelectListBox
            list={wilayasList}
            setState={setWilaya}
            state={wilaya}
          />
          <TextField
            className="my-5"
            value={fullAddress}
            onChange={(event) => setFullAddress(event.target.value)}
            id={"outlined-basic"}
            label={"Full Adress"}
            variant="outlined"
            type={"text"}
            name={"address"}
            required
          />
          <TextField
            className="my-5"
            value={codePromo}
            onChange={(event) => setCodePromo(event.target.value)}
            id={"outlined-basic"}
            label={"Code Promo ( optional )"}
            variant="outlined"
            type={"text"}
            name={"code_promo"}
          />
        </div>
        <div className="my-4 flex justify-center items-center gap-3">
          <span className="text-[20px]">Quantity </span> <NumberInput />
        </div>
        <div className="grid text-2xl justify-center my-5 ">
          {/* <span className="text-[35px]">Price</span> */}
          <span className="">
            {productName}&apos;s cost : {productPrice} DZD
          </span>
          <span className="">
            Delivery cost : {wilaya == "Algiers - 16" ? "400 DZD" : "700 DZD"}
          </span>
          <span className="">
            Total Cost :{" "}
            {price}
            DZD
          </span>
        </div>
        <button
          className="mb-10 w-[100%] flex justify-center"
        >
          <button type={"submit"} className="w-[80%] bg-black  h-[50px] text-white flex justify-center items-center text-3xl justify-self-center " >
            Confirm Order
          </button>
        </button>
      </form>
    </div>
  );
}

