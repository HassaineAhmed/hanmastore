import { useState } from "react";
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
  setShowOrderNotification,
  productData,
  setBuyForm,
  setShowSelectSizeNColor,
}) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [secondPhoneNumber, setSecondPhoneNumber] = useState();
  const [wilaya, setWilaya] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      productName: productData.name,
      fullName: name,
      phoneNumber: phoneNumber,
      secondPhoneNumber: secondPhoneNumber ? secondPhoneNumber : 0,
      wilaya: wilaya,
      fullAddress: fullAddress,
      quantity: value,
      size: size,
    };
    setTimeout(() => {
      setBuyForm(false);
    }, 500);
    setShowOrderNotification(true);
    setTimeout(() => {
      setShowOrderNotification(false);
    }, 6000);
  }
  const [value, setValue] = useState(1);
  // this concerns handling the quantity
  const NumberInput = ({ defaultValue = 0, onChange }) => {
    const increment = () => {
      const newValue = value + 1;
      setValue(newValue);
      onChange && onChange(newValue);
    };

    const decrement = () => {
      if (value > 1) {
        const newValue = value - 1;
        setValue(newValue);
        onChange && onChange(newValue);
      }
    };

    return (
      <div className="flex grow-0 justify-center items-center gap-2">
        <div className="flex border-[2px] px-[10px] gap-2">
          <button onClick={decrement}>
            <FaMinus />
          </button>
          <span className="border-x-2 px-[8px] text-[25px]"> {value} </span>
          <button onClick={increment}>
            <FaPlus />
          </button>
        </div>
      </div>
    );
  };
  function SelectListBox({ list, setState, state }) {
    return (
      <Box sx={{ maxWidth: 200 }}>
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
    <div className="w-[94%] h-[97%] top-[5%] left-[3%] rounded-2xl bg-[white] grid items-center justify-center absolute">
      <div className="absolute top-[15px] left-[15px]">
        {" "}
        <button
          onClick={() => {
            setShowSelectSizeNColor(false);
            setBuyForm(false);
          }}
        >
          <CloseIcon sx={{ fontSize: 30 }} />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className={"grid justify-center items-center gap-3"}
      >
        <span className="text-[35px]">Complete The Order</span>
        <div className="grid gap-4 justify-center items-center">
          <TextField
            className="my-5 w-[200px] py-[10px] "
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
            className="my-5 w-[200px] py-[10px] "
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
            className="my-5 w-[200px] py-[10px] "
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
            className="my-5 w-[200px] py-[10px] "
            value={fullAddress}
            onChange={(event) => setFullAddress(event.target.value)}
            id={"outlined-basic"}
            label={"Full Adress"}
            variant="outlined"
            type={"text"}
            name={"address"}
            required
          />
        </div>
        <div className="my-2 flex justify-center items-center gap-3">
          <span className="text-[20px]">Quantity </span> <NumberInput />
        </div>
        <div className="grid ">
          {/* <span className="text-[35px]">Price</span> */}
          <span className="text-[20px]">
            {productData.name}&apos;s cost : {productData.price} DZD
          </span>
          <span className="text-[20px]">
            Delivery cost : {wilaya == "Algiers - 16" ? "400 DZD" : "700 DZD"}
          </span>
          <span className="text-[20px]">
            Total Cost :{" "}
            {wilaya == "Algiers - 16"
              ? value * parseInt(productData.price) + 400
              : value * parseInt(productData.price) + 700}{" "}
            DZD
          </span>
        </div>
        <button
          className={`p-3 m-1 bg-[#22A39F] text-[black] rounded-xl  max-w-[220px] text-[25px] min-w-[200px] justify-self-center`}
        >
          Confirm Order{" "}
        </button>
      </form>
    </div>
  );
}
