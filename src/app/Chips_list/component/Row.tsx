"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { fotmatAttributes } from "@/types/Installation";
import { Button, ButtonGroup, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteInstallation } from "@/app/services/Intallation";
import { formatClp } from "@/utils/const";
import ModalUpdate from "@/app/Installation_list/component/ModalUpdate";
import { client } from "@/types/Client";
import { empresa } from "@/types/Compani";
import { useEffect, useState } from "react";
import { Row } from "@/app/Installation_list/component/Row";

interface Props {
  row: empresa;
  client: client[];
  fetchInstalattion: () => void;
  instalattion: fotmatAttributes[];
}

export function Row2({ row, client, fetchInstalattion, instalattion }: Props) {
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [data, setData] = React.useState<fotmatAttributes[]>([]);

  let total = 0;

  useEffect(() => {
    //filtra instalattion por row.label
    const filter = instalattion.filter((item) => item.company === row.label);
    setData(filter);
  }, [row, instalattion, open]);

  const sumaCostos = data.reduce((total, item) => {
    // sumar cost siempre que label no sea chip

    const costoTotal = item.product.reduce(
      (subtotal, producto) =>
        subtotal +
        (producto?.cost === undefined
          ? 0 
           : producto?.name === undefined
           ? 0
           : producto?.name.includes("M2M")
           ? producto.cost
           : 0),
      0
    );
    return total + costoTotal;
  }, 0);
  function createData(
    name: any,
    calories: any,
    fat: any,
    carbs: any,
    protein: any,
    imeigps: any
  ) {
    return { name, calories, fat, carbs, protein, imeigps };
  }

  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
   
    const newDataArray = data.flatMap((instalattion) => {
      return instalattion.product.map((product) => {
        if(product.name?.includes("M2M")){
            return createData(
                instalattion.company,
                instalattion.fecha,
                product.name,
                product.cost,
                product.value,
                product.imeigps
              );
        }
      });
    });
    const filteredDataArray = newDataArray.filter((item) => item !== undefined);
    
     setRows(filteredDataArray);
    console.log(filteredDataArray)

    
   
  }, [data, open]);

  rows?.map((historyRow: any, index: any) => {
    if (historyRow != undefined) {
      total = total + (historyRow.protein);
    }
  });

  const sumaValue = data.reduce((total, item) => {
    const costoTotal = item.product.reduce(
      (subtotal, producto) =>
        subtotal + (producto?.value === undefined
           ? 0 
           : producto?.name === undefined
           ? 0
           : producto?.name.includes("M2M")
           ? producto.value
           : 0),
      0
    );
    return total + costoTotal;
  }, 0);

  const handleClickOpen = () => {
    setOpenUpdate(true);
  };

  const { deleteInstallation } = useDeleteInstallation(fetchInstalattion);

  

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">
          <strong>{row.label}</strong>
        </TableCell>
        <TableCell style={{ fontSize: 12 }} align="left">
          {rows.length}
        </TableCell>
        <TableCell style={{ fontSize: 12 }} align="left">
          $ {formatClp(`${sumaValue}`)}
        </TableCell>
        <TableCell style={{ fontSize: 12 }} align="left">
          $ {formatClp(`${sumaCostos}`)}
        </TableCell>
        <TableCell style={{ fontSize: 12 }} align="left">
          ${" "}
          {formatClp(
            `${
              (sumaValue - sumaCostos)
            }`
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Dispositivos
              </Typography>
              <Table size="small" aria-label="purchases">
              <TableHead>
                  <TableRow>
                    <TableCell>Empresa</TableCell>
                    <TableCell>Fecha Instalacion</TableCell>
                    <TableCell align="right">Tipo Chip</TableCell>
                    <TableCell align="right">Numero Chip</TableCell>
                    <TableCell align="right">Costo ($)</TableCell>
                    <TableCell align="right">Valor ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.map(
                    (historyRow: any, index: any) =>
                      historyRow != undefined && (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {historyRow.name}
                          </TableCell>
                          <TableCell>{historyRow.calories}</TableCell>
                          <TableCell align="right">
                            {historyRow.fat}
                          </TableCell>
                          <TableCell align="right">
                            {historyRow.numerochip}
                          </TableCell>
                          <TableCell align="right">
                            $ {formatClp(`${historyRow.carbs}`)}
                          </TableCell>
                          <TableCell align="right">
                            $ {formatClp(`${historyRow?.protein}`)}
                          </TableCell>
                        </TableRow>
                      )
                  )}

                  <TableRow>
                    <TableCell rowSpan={1} />
                    <TableCell colSpan={4}><strong>Total</strong></TableCell>
                    <TableCell align="right">
                      <strong>$ {formatClp(`${total}`)}</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
