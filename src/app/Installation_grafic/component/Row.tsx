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
import { useEffect } from "react";
import { Row } from "@/app/Installation_list/component/Row";

interface Props {
  row: empresa;
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

  const sumaCostos = data.reduce((total, item) => {
    // sumar cost siempre que label no sea chip
    const costoTotal = item.product.reduce(
      (subtotal, producto) =>
        subtotal +
        (producto?.cost === undefined
          ? 0
          : producto?.name === undefined
          ? 0
          : producto.cost),
      0
    );
    return total + costoTotal;
  }, 0);

  const sumaValue = data.reduce((total, item) => {
    const costoTotal = item.product.reduce(
      (subtotal, producto) =>
        subtotal +
        (producto?.value === undefined
          ? 0
          : producto?.name === undefined
          ? 0
          : producto.value),
      0
    );
    return total + costoTotal;
  }, 0);

  const calcularSumaTotal = (data: fotmatAttributes[], estado: string) => {
    const sumaTotal = data.reduce((total, item) => {
      const costoTotal = item.product.reduce(
        (subtotal, producto) =>
          subtotal +
          (producto?.value === undefined
            ? 0
            : item?.state !== estado
            ? 0
            : producto.value),
        0
      );
      return total + costoTotal;
    }, 0);

    return sumaTotal;
  };

  //sumar total si el state es Pendiente

  const { deleteInstallation } = useDeleteInstallation(fetchInstalattion);

  function calcularTotal(sumaValue: number, sumaCostos: number, row: empresa) {
    const porcentaje = row.percentage === 0 ? 1 : row.percentage / 100;
    const resultado = (sumaValue - sumaCostos) * porcentaje;
    return resultado;
  }

  // Luego, puedes usar esta función para calcular el total en tu código:
  const totalNeto = calcularTotal(sumaValue, sumaCostos, row);

  const countRevisions = data.reduce((count, item) => {
    // Verificar si item.product existe y es un arreglo con al menos un elemento
    if (Array.isArray(item.product) && item.product.length > 0) {
      // Verificar si algún producto tiene el nombre "revicion" (corregido a "revision")
      if (item.product.some((product) => product.name === "GARANTIA")) {
        return count + 1; // Incrementar el contador si se encuentra "revision"
      }
    }
    return count; // Mantener el contador sin cambios si no se encuentra "revision" o no hay productos
  }, 0);

  //contar pendientes de data.state

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

        {openDetalles && (
          <>
          <TableCell
          style={{ fontSize: 12, backgroundColor: "#BFC9CA" }}
          align="left"
        >
          {data
            .map((item) => (item.state === "PENDIENTE" ? 1 : 0))
            .reduce((a, b) => (a + b) as any, 0)}{" "}
          ={" $"}
          {formatClp(`${calcularSumaTotal(data, "PENDIENTE")}`)}
        </TableCell>
        <TableCell
          style={{ fontSize: 12, backgroundColor: "#BFC9CA" }}
          align="left"
        >
          {data
            .map((item) => (item.state === "EFECTIVO" ? 1 : 0))
            .reduce((a, b) => (a + b) as any, 0)}{" "}
          ={" $"}
          {formatClp(`${calcularSumaTotal(data, "EFECTIVO")}`)}
        </TableCell>
        <TableCell
          style={{ fontSize: 12, backgroundColor: "#BFC9CA" }}
          align="left"
        >
          {data
            .map((item) => (item.state === "TRANSFERENCIA" ? 1 : 0))
            .reduce((a, b) => (a + b) as any, 0)}{" "}
          ={" $"}
          {formatClp(`${calcularSumaTotal(data, "TRANSFERENCIA")}`)}
        </TableCell>
        <TableCell
          style={{ fontSize: 12, backgroundColor: "#BFC9CA" }}
          align="left"
        >
          {data
            .map((item) => (item.state === "PAGADO" ? 1 : 0))
            .reduce((a, b) => (a + b) as any, 0)}{" "}
          ={" $"}
          {formatClp(`${calcularSumaTotal(data, "PAGADO")}`)}
        </TableCell>
        </>
        )}
        

        <TableCell style={{ fontSize: 12 }} align="left">
          $ {formatClp(`${sumaValue}`)}
        </TableCell>
        <TableCell style={{ fontSize: 12 }} align="left">
          $ {formatClp(`${sumaCostos}`)}
        </TableCell>
        <TableCell style={{ fontSize: 12 }} align="left">
          $ {formatClp(`${totalNeto}`)}
        </TableCell>
        <TableCell style={{ fontSize: 12 }} align="left">
          $ {formatClp(`${totalNeto + sumaCostos}`)}
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
