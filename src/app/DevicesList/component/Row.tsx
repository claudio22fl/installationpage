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
import { formatClp } from "@/utils/const";
import { client } from "@/types/Client";
import { empresa } from "@/types/Compani";
import { useEffect } from "react";
import { Row } from "@/app/Installation_list/component/Row";
import { calcularTotal, utils } from "../utils/utils";
import { Producto } from "@/types/Product";

interface Props {
  row: Producto;
  client: client[];
  fetchInstalattion: () => void;
  instalattion: fotmatAttributes[];
  openDetalles: boolean;
}

export function Row2({ row, client, fetchInstalattion, instalattion, openDetalles }: Props) {
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [data, setData] = React.useState<fotmatAttributes[]>([]);

  let total = 0;

  useEffect(() => {
    //filtra instalattion por row.label
    const filter = instalattion.filter((item) => item.company === row.label);
    setData(filter);
  }, [row, instalattion, open]);

  const { sumaCostos, sumaValue , sumaValueChip, countRevisions} = utils({data})

  const totalNeto = 0;
 
  const rol = localStorage.getItem("rol");
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
          {data.length}
        </TableCell>
        <TableCell style={{ fontSize: 12 }} align="left">
          {countRevisions}
        </TableCell>
          <TableCell style={{ fontSize: 12 }} align="left">
          $ {formatClp(`${sumaValue}`)}
        </TableCell>

        
        {rol === "admin" && (
        <>
         <TableCell style={{ fontSize: 12 }} align="left">
          $ {formatClp(`${sumaCostos}`)}
        </TableCell>
        <TableCell style={{ fontSize: 12 }} align="left">
          $ {formatClp(`${totalNeto}`)}
        </TableCell>
        <TableCell style={{ fontSize: 12 }} align="left">
          $ {formatClp(`${sumaValueChip}`)}
        </TableCell>
        <TableCell style={{ fontSize: 12 }} align="left">
          $ {formatClp(`${totalNeto + sumaCostos + sumaValueChip}`)}
        </TableCell>
      
        </>
        )}
       
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Dispositivos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead></TableHead>
                <TableBody>
                  {data.map((row) => (
                    <Row
                      key={row.id}
                      row={row}
                      client={client}
                      fetchInstalattion={fetchInstalattion}
                    />
                  ))}

                  {/* <TableRow>
                    <TableCell rowSpan={1} />
                    <TableCell colSpan={4}><strong>Total</strong></TableCell>
                    <TableCell align="right">
                      <strong>$ {formatClp(`${total}`)}</strong>
                    </TableCell>
                  </TableRow> */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
