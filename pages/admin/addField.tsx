import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { DOMAINE_URL } from "../_app"
export default function AddField() {
  const [type, setType] = useState("");

  async function handleSubmit(event : any) {
    event.preventDefault();
    await fetch(`http://${DOMAINE_URL}/api/addField`, {
      method: "POST",
      body: JSON.stringify({
        name: event.target.name.value,
        type: event.target.selectType.value,
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
  return (
    <div className="my-[200px]">
      <div className="grid items-center justify-center">
        <span className="text-center my-[30px] text-3xl">Add Field</span>

        <form onSubmit={handleSubmit}>
          <div className="grid justify-center">
            <div className="flex items-center">
              <TextField
                className="m-5"
                id={"outlined-basic"}
                label={"name"}
                variant="outlined"
                type={"text"}
                name={"name"}
                required
              />

              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    name={"selectType"}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    onChange={(event) => setType(event.target.value)}
                    label="Age"
                    required
                  >
                    <MenuItem value={"text"}>text</MenuItem>
                    <MenuItem value={"number"}>number</MenuItem>
                    <MenuItem value={"email"}>email</MenuItem>
                    <MenuItem value={"password"}>password</MenuItem>
                    <MenuItem value={"button"}>button</MenuItem>
                    <MenuItem value={"checkbox"}>checkbox</MenuItem>
                    <MenuItem value={"image"}>image</MenuItem>
                    <MenuItem value={"password"}>password</MenuItem>
                    <MenuItem value={"url"}>url</MenuItem>
                    <MenuItem value={"image"}>image</MenuItem>
                    <MenuItem value={"file"}>file</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            {/* <button className={"p-5 bg-[green] rounded-xl border-2 max-w-[220px] text-[white] min-w-[200px] justify-self-center"} type={"submit"}>Submit</button> */}
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
