import React from 'react'
import { Autocomplete, Grid, Input, TextField } from "@mui/material";

interface Props {
  formData: any ,
  name: string, 
  autocompleteChague: any, 
  compani: any,
  label: string
}

export default function AutocompleteInput({formData ,name, autocompleteChague, compani,label}: Props) {
  return (
       <Autocomplete
           freeSolo
           disablePortal
           value={formData[name]}
           onChange={(event: any, newValue: string) => {
            if(newValue === null){
              newValue= '';
              autocompleteChague(name, newValue );
           }
            autocompleteChague(name, newValue );
           }}
           onInputChange={(event, newInputValue) => {
            autocompleteChague(name, newInputValue );
           }}
           id={name}
           options={compani}
           sx={{ m: 1, width: '30ch' }}
           renderInput={(params) => <TextField {...params} label={label} />}
         />
  )
}
