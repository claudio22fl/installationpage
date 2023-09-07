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
import {
  Button,
  ButtonGroup,
  Checkbox,
  Fade,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
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
    name: any,
    calories: any,
    id: any,
    fat: any,
    carbs: any,
    protein: any,
    imeigps: any
  ) {
    return { name, calories, id, fat, carbs, protein, imeigps };
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
      total = total + historyRow.protein;
    }
  });

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

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const habdleUpdate = () => {
    console.log(selectedRows);
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

  function sumarMesesALaFecha(fecha: string, texto: string) {
    // Parsea la fecha en formato "DD-MM-YYYY" a objetos Date
    const partesFecha = fecha.split('-');
    const dia = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10);
    const año = parseInt(partesFecha[2], 10);
    const fechaObj = new Date(año, mes - 1, dia); // Resta 1 al mes porque los meses van de 0 a 11 en JavaScript
  
    // Extrae la cantidad de meses del texto
    const partes = texto.split(/\D+/)
    let meses = Number(partes[2]);
  
    // Suma los meses a la fecha
    fechaObj.setMonth(fechaObj.getMonth() + meses);
  
    // Formatea la nueva fecha en formato "DD-MM-YYYY"
    const nuevoDia = fechaObj.getDate().toString().padStart(2, '0');
    const nuevoMes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); // Suma 1 al mes porque los meses se muestran de 1 a 12
    const nuevoAño = fechaObj.getFullYear();
  
    return `${nuevoDia}-${nuevoMes}-${nuevoAño}`;
  }

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
                Dispositivos <Button onClick={handleOpen}>Editar</Button>
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Checkbox></Checkbox>
                    </TableCell>
                    <TableCell>Empresa</TableCell>
                    <TableCell>Fecha Instalacion</TableCell>
                    <TableCell>Fecha Vencimiento</TableCell>
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
                          <TableCell>
                            <Checkbox
                              checked={selectedRows.includes(historyRow.id as never)}
                              onChange={() => handleCheckboxChange(historyRow.id as never)}
                            />
                          </TableCell>
                          
                          <TableCell component="th" scope="row">
                            {historyRow.name}
                          </TableCell>
                          <TableCell>{historyRow.calories}</TableCell>
                          <TableCell>{sumarMesesALaFecha(historyRow.calories,historyRow.fat)}</TableCell>
                          <TableCell align="right">{historyRow.fat}</TableCell>
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
                    <TableCell colSpan={5}>
                      <strong>Total</strong>
                    </TableCell>
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
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography id="spring-modal-title" variant="h6" component="h2">
              Meses a renovar
            </Typography>
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              <TextField
                id="outlined-number"
                label="Meses a renovar"
                type="number"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
              />
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={habdleUpdate}
              >
                Renovar
              </Button>
              <Button variant="contained" color="error" onClick={handleClose}>
                Cancelar
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
