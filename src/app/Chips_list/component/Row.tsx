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
import { Button, Checkbox, Fade, Modal, TextField } from "@mui/material";
import { useDeleteInstallation } from "@/app/services/Intallation";
import { formatClp, formatearFecha, style, sumarMesesALaFecha } from "@/utils/const";
import { client } from "@/types/Client";
import { empresa } from "@/types/Compani";
import { useEffect, useState } from "react";
import { HistorySims } from "./HistorySims";
import { postHistory, useFetchHistory } from "@/app/services/History";
import { history } from "@/types/History";
import ModalUpdate from "./ModalUpdate";

interface Props {
  row: empresa;
  client: client[];
  fetchInstalattion: () => void;
  instalattion: fotmatAttributes[];
  history: history[];
}

export function Row2({
  row,
  client,
  fetchInstalattion,
  instalattion,
  history,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [data, setData] = React.useState<fotmatAttributes[]>([]);
  const [selectedRows, setSelectedRows] = useState([]);

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
    compani: string,
    fehchaInsta: string,
    id: number | undefined,
    producto: string | undefined,
    cost: number | undefined,
    value: number | undefined,
    imeiGps: string | undefined
  ) {
    return { compani, fehchaInsta, id, producto, cost, value, imeiGps };
  }

  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    const newDataArray = data.flatMap((instalattion) => {
      return instalattion.product.map((product) => {
        if (product.name?.includes("M2M")) {
          return createData(
            instalattion.company,
            instalattion.fecha,
            instalattion.id,
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
  }, [data, open]);

  rows?.map((historyRow: any, index: any) => {
    if (historyRow != undefined) {
      total = total + historyRow.value;
    }
  });

  const [month, setMonth] = useState<number>(0);

  const handleClickMonth = (event: any) => {
    setMonth(event.target.value);
  };

  const sumaValue = data.reduce((total, item) => {
    const costoTotal = item.product.reduce(
      (subtotal, producto) =>
        subtotal +
        (producto?.value === undefined
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

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
   

  const habdleUpdate = async (history: history[]) => {
    const newHistory = history;
    for (const item of selectedRows) {
      const filter = rows.filter((row: history) => row.id === item);

      console.log(history);

      const ultimoHistorial = newHistory.reduce((lastHistory :any, currentHistory) => {
        if (currentHistory.idinstalattion === filter[0].id) {
          if (!lastHistory || (currentHistory.id ? currentHistory.id : 0) > (lastHistory.id ? lastHistory.id : 0)) {
            return currentHistory;
          }
        }
        return lastHistory;
      }, undefined);

      console.log(ultimoHistorial);

      if (ultimoHistorial == undefined) {
        const data: history = {
          months: String(month),
          renewal: sumarMesesALaFecha(
            filter[0].fehchaInsta,
            filter[0].producto
          ),
          idinstalattion: filter[0].id,
        };
        console.log('1');
         postHistory(data);
      } else {
        const data: history = {
          months: String(month),
          renewal: sumarMesesALaFecha(
            formatearFecha(ultimoHistorial.renewal),
            String(ultimoHistorial.months)
          ),
          idinstalattion: filter[0].id,
        };
        console.log(data);
         postHistory(data);
      }
    

      //postHistory(data);
    }
  };

  const handleCheckboxChange = (index: never) => {
    if (selectedRows.includes(index)) {
      // Si el checkbox ya estaba seleccionado, lo deseleccionamos
      setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      // Si el checkbox no estaba seleccionado, lo seleccionamos
      setSelectedRows([...selectedRows, index]);
    }
  };

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
          $ {formatClp(`${sumaValue - sumaCostos}`)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sims <Button onClick={handleOpen}>Editar</Button>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.length === rows.length}
                        onChange={() => {
                          if (selectedRows.length === rows.length) {
                            setSelectedRows([]);
                          } else {
                            setSelectedRows(rows.map((row: any) => row.id));
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>Empresa</TableCell>
                    <TableCell>Fecha Instalacion</TableCell>
                    <TableCell>Fecha p Vencimiento</TableCell>
                    <TableCell>Fecha u Vencimiento</TableCell>
                    <TableCell>Tipo Chip</TableCell>
                    <TableCell>Numero Chip</TableCell>
                    <TableCell>Costo ($)</TableCell>
                    <TableCell>Valor ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.map(
                    (historyRow: any, index: any) =>
                      historyRow != undefined && (
                        <>
                          <HistorySims
                            row={historyRow}
                            client={client}
                            fetchInstalattion={fetchInstalattion}
                            selectedRows={selectedRows}
                            handleCheckboxChange={handleCheckboxChange}
                          />
                          <ModalUpdate
                            openModal={openModal}
                            handleClose={handleClose}
                            month={month}
                            handleClickMonth={handleClickMonth}
                            habdleUpdate={habdleUpdate}
                            history={history}
                          />
                        </>
                      )
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
