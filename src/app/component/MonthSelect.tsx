import { getMonth } from '@/utils/const';
import { MenuItem, Select } from '@mui/material'
import React from 'react'


interface Props {
    month: number;
    setMonth: (month:number) => void;
}

export default function MonthSelect({month, setMonth}: Props) {
    


    const handleChange = (e: { target: { name: string; value: string } }) => {
        setMonth(Number(e.target.value));

    }
 

   
  return (
    <>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      defaultValue={`${month}`}
      value={`${month}`}
     label="Mes"
     onChange={handleChange}
    >
      <MenuItem value={"1"}>Enero</MenuItem>
      <MenuItem value={"2"}>Febrero</MenuItem>
      <MenuItem value={"3"}>Marzo</MenuItem>
      <MenuItem value={"4"}>Abril</MenuItem>
      <MenuItem value={"5"}>Mayo</MenuItem>
      <MenuItem value={"6"}>Junio</MenuItem>
      <MenuItem value={"7"}>Julio</MenuItem>
      <MenuItem value={"8"}>Agosto</MenuItem>
      <MenuItem value={"9"}>Septiembre</MenuItem>
      <MenuItem value={"10"}>Octubre</MenuItem>
      <MenuItem value={"11"}>Noviembre</MenuItem>
      <MenuItem value={"12"}>Diciembre</MenuItem>
    </Select>
    </>
  )
}