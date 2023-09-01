"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { fotmatAttributes } from "@/types/Installation";
import { Button, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteInstallation } from "@/app/services/Intallation";
import { formatClp } from "@/utils/const";

function Row(props: { row: fotmatAttributes }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const lines = row.note.split("\n");

  let total = 0;

  row.product?.map((historyRow, index) => {
    if (historyRow != undefined) {
      total = total + (historyRow.value ?? 0);
    }
  });
  console.log(row.note);

 const {deleteInstallation} = useDeleteInstallation();
  

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
        <TableCell component="th" scope="row">
          {row.fecha}
        </TableCell>
        <TableCell align="left">{row.client}</TableCell>
        <TableCell align="left">{row.patent}</TableCell>
        <TableCell align="left">{row.vehiclename}</TableCell>
        <TableCell align="left">{row.installationtype}</TableCell>
        <TableCell align="left">{row.product.length}</TableCell>
        <TableCell align="left">
          {" "}
          {lines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </TableCell>
        <TableCell width={50} align="left">
          <Stack spacing={2}>
            <Button onClick={() => deleteInstallation(row?.id)} variant="outlined" color="error" startIcon={<DeleteIcon />}>
              Delete
            </Button>
            <Button variant="outlined" startIcon={<EditIcon />}>
              Edit
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Dispositivos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Dispositivo</TableCell>
                    <TableCell>Imei GPS</TableCell>
                    <TableCell align="right">Tipo Chip</TableCell>
                    <TableCell align="right">Numero Chip</TableCell>
                    <TableCell align="right">Costo ($)</TableCell>
                    <TableCell align="right">Valor ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.product?.map((historyRow, index) => (
                    historyRow != undefined &&
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {historyRow.name}
                      </TableCell>
                      <TableCell>{historyRow.imeigps}</TableCell>
                      <TableCell align="right">
                        {historyRow?.tipochip}
                      </TableCell>
                      <TableCell align="right">
                        {historyRow?.numerochip}
                      </TableCell>
                      <TableCell align="right">$ {formatClp(`${historyRow.cost}`)}</TableCell>
                      <TableCell align="right">$ {formatClp(`${historyRow?.value}`)}</TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell rowSpan={1} />
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell align="right">$ {formatClp(`${total}`)}</TableCell>
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

interface Props {
  instalattion: fotmatAttributes[];
}

export default function CollapsibleTable({ instalattion }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Fecha</TableCell>
            <TableCell align="left">Cliente</TableCell>
            <TableCell align="left">Pantene</TableCell>
            <TableCell align="left">Vehiculo</TableCell>
            <TableCell align="left">Tipo</TableCell>
            <TableCell align="left">DI</TableCell>
            <TableCell align="left">Notas</TableCell>
            <TableCell align="left">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instalattion.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
