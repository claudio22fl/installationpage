"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fotmatAttributes } from "@/types/Installation";
import { client } from "@/types/Client";
import { Row2 } from "./Row";
import {
  IconButton,
  TableFooter,
  TablePagination,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { columns } from "../const";
import { empresa } from "@/types/Compani";
import { formatClp } from "@/utils/const";
import { Producto } from "@/types/Product";

interface Props {
    ordenarIntalacionesAlfabeticamente : (data:string,order:boolean,index:number) => void;
    orderFiels : boolean[];
    showFields : boolean;
    handleSearch : (e: React.ChangeEvent<HTMLInputElement>) => void;
    inicio : number;
    final : number;
}

export default function TableHeadComponent({ordenarIntalacionesAlfabeticamente, orderFiels, showFields,handleSearch, inicio, final}: Props) {

  return (
    <>
    {columns.slice(inicio,final).map((columns, index) => (
        <TableCell
          align="left"
          sx={{ paddingLeft: 0 }}
          onClick={() =>
            ordenarIntalacionesAlfabeticamente(
              columns.data,
              orderFiels[index],
              index
            )
          }
          style={{ cursor: "pointer" }}
          key={index}
        >
          <div
            style={{
              display: "flex",
              alignItems: "left",
              justifyContent: "flex-start",
              marginLeft: 0,
            }}
          >
            {columns.label != "Acciones" && columns.label != "DI" && (
              <IconButton aria-label="delete" size="small">
                {orderFiels[index] ? (
                  <ArrowDownwardIcon fontSize="inherit" />
                ) : (
                  <ArrowUpwardIcon fontSize="inherit" />
                )}
              </IconButton>
            )}

            {columns.label}
          </div>
          {showFields &&
            columns.label != "Acciones" &&
            columns.label != "DI" && (
              <TextField
                label={columns.label}
                variant="standard"
                name={columns.data}
                onChange={handleSearch}
              />
            )}
        </TableCell>
      ))}

</>
  )
}
