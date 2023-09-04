"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { fotmatAttributes } from "@/types/Installation";
import { client } from "@/types/Client";
import { Row } from "./Row";


interface Props {
  instalattion: fotmatAttributes[];
  client: client[];
}

export default function CollapsibleTable({ instalattion, client }: Props) {
  return (
    <>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Empresa</TableCell>
            <TableCell align="left">Fecha</TableCell>
            <TableCell align="left">Cliente</TableCell>
            <TableCell align="left">Pantene</TableCell>
            <TableCell align="left">Vehiculo</TableCell>
            <TableCell align="left">Tipo</TableCell>
            <TableCell align="left">Direccion</TableCell>
            <TableCell align="left">DI</TableCell>
            <TableCell align="left">Notas</TableCell>
            <TableCell align="left">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instalattion.map((row) => (
            <Row key={row.id} row={row} client={client} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   
    </>
  );
}
