import { IImpuchip, IInputsTypeProps } from "@/types/Types";
import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Autocomplete, Grid, Input, TextField } from "@mui/material";
import { useFetchCompani } from "@/app/services/Compani";
import AutocompleteInput from "./inputs/AutoCompleteInput";
import { useFetchDevice } from "@/app/services/Device";

export default function Inputtype({
  inputs,
  handleChange,
  formData,
  autocompleteChague,
  inicio,
  fin,
  autocoleteData,
}: IInputsTypeProps) {

  return (
    <>
      {inputs.slice(inicio, fin).map(({ id, name, label, tipo, valor, shrink }: IImpuchip) => (
        <Grid spacing={{ xs: 3, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {tipo === "autocomplete" && (
            <AutocompleteInput
              formData={formData}
              name={name}
              autocompleteChague={autocompleteChague}
              compani={autocoleteData}
              label={label}
            />
          )}
         {tipo === "selected" && (
           <FormControl   sx={{ m: 1, width: "30ch" }} >
          <InputLabel id="demo-simple-select-label">{label}</InputLabel>
           <Select
          labelId="demo-simple-select-label"
           id={name}
           name={name}
           value={formData[name]}
           label={label}
           onChange={handleChange}
         >
           {Object.assign(valor).map((mes: string) => {
             return (
               <MenuItem key={mes} value={mes}>
                 {mes}
               </MenuItem>
             );
           })}
         </Select>
         </FormControl>
          )}

           {tipo != "autocomplete"  && tipo != "selected" && (
           <TextField
           id={name}
           type={tipo}
           name={name}
           variant="outlined"
           onChange={handleChange}
           value={formData[name]}
           sx={{ m: 1, width: "30ch" }}
           required={false}
           label={label}
           multiline = {shrink}
           rows={4}
         />
          )}
          
        </Grid>
      ))}
    </>
  );
}
