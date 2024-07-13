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
  row: string;
  client: client[];
  fetchInstalattion: () => void;
  instalattion: fotmatAttributes[];
  openDetalles: boolean;
  compani: empresa[]
}

export function Row2({
  row,
  client,
  fetchInstalattion,
  instalattion,
  openDetalles,
  compani
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [data, setData] = React.useState<fotmatAttributes[]>([]);

  let total = 0;

  useEffect(() => {
    const filter = instalattion.filter((item) =>
      item.product.some((pro) => pro.name === row)
    );
    setData(filter);
  }, [row, instalattion, open]);

  const { sumaCostos, sumaValue, sumaValueChip, countRevisions } = utils({
    data,
  });

  const rol = localStorage.getItem("rol");

  const totalCost = data.reduce(
    (total, inst) =>
      total +
      inst.product.reduce(
        (totalp, p) => totalp + (p.name === row ? p.cost : 0),
        0
      ),
    0
  );

  const totalValue = data.reduce(
    (total, inst) =>
      total +
      inst.product.reduce(
        (totalp, p) => totalp + (p.name === row ? p.value : 0),
        0
      ),
    0
  );

  const totalWithDiscount = data.reduce((total, inst) => {
    const company = compani.find(em => em.label === inst.company);
    const discountPercentage = company ? company.percentage : 0;
   
    const productTotal = inst.product.reduce((totalp, p) => {
      const discount = (p.value - p.cost) * (discountPercentage / 100);
      return totalp + ((p.value - p.cost) - discount);
    }, 0);
  
    return total + productTotal;
  }, 0);

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
          <strong>{row}</strong>
        </TableCell>
        <TableCell style={{ fontSize: 12 }} align="left">
          {data.length}
        </TableCell>
        <TableCell style={{ fontSize: 12 }} align="left">
          ${formatClp(totalCost.toString())}
        </TableCell>
        <TableCell style={{ fontSize: 12 }} align="left">
          ${formatClp(totalValue.toString())}
        </TableCell>
        <TableCell style={{ fontSize: 12 }} align="left">
          ${formatClp((totalValue - totalCost).toString())}
        </TableCell>
        <TableCell style={{ fontSize: 12 }} align="left">
          ${formatClp((totalWithDiscount).toString())}
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
