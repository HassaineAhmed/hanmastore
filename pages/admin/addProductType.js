import { getFields } from "../../prisma/playingWithData";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { DOMAINE_URL} from "../_app"
export default function AddProductType({ fields }) {
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: event.target.name.value,
      fields: types,
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
      <div className="grid">
        <span className="text-center my-[30px] text-3xl">
          {" "}
          Add New Product Type
        </span>
      </div>
      <div className="grid items-center justify-center">
        <form
          className={"justify-center items-center flex flex-col"}
          onSubmit={handleSubmit}
        >
          <TextField
            className="m-5"
            id={"outlined-basic"}
            label={"name"}
            variant="outlined"
            type={"text"}
            name={"name"}
          />

          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                name={"selectType"}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                onChange={(event) => {
                  setType(event.target.value);
                  setTypes((prev) => [...prev, event.target.value]);
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
          <div className="flex items-center justify-center">
            {types.map((type, index) => {
              return (
                <div className="m-2 p-3 rounded-lg bg-color1" key={index}>
                  {type}
                  <ClearIcon
                    onClick={(event) =>
                      setTypes((prev) =>
                        prev
                          .filter((u) => (u == type ? false : true))
                          .map((i) => i)
                      )
                    }
                  />
                </div>
              );
            })}
          </div>
          <div>
            <button
              type={"submit"}
              className={`p-5 m-5 bg-formColor2 text-[black] rounded-xl  max-w-[220px]  min-w-[200px] justify-self-center`}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const fields = await getFields();
  return { props: { fields: fields } };
}
