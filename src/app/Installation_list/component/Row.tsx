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
import { Button, ButtonGroup, Stack, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteInstallation, useUpdateInstallation } from "@/app/services/Intallation";
import { formatClp } from "@/utils/const";
import ModalUpdate from "@/app/Installation_list/component/ModalUpdate";
import { client } from "@/types/Client";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import PaymentIcon from '@mui/icons-material/Payment';

interface Props {
  row: fotmatAttributes;
  client: client[];
  fetchInstalattion: () => void;
}

export function Row({ row, client, fetchInstalattion }: Props) {
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const lines = row.note.split("\n");

  let total = 0;

  row.product?.map((historyRow, index) => {
    if (historyRow != undefined) {
      total = total + (historyRow.value ?? 0);
    }
  });

  const handleClickOpen = () => {
    setOpenUpdate(true);
  };

  const { deleteInstallation } = useDeleteInstallation(fetchInstalattion);
 const { updateInstallation } = useUpdateInstallation(fetchInstalattion);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            color={row.product?.map((item) => item?.name).includes("GARANTIA") ? "error" : 'default'}
          >
           {row.product.length > 1 && row.product?.map((item) => item?.name).includes("GARANTIA") ? (
             open ? <KeyboardDoubleArrowUpIcon /> : <KeyboardDoubleArrowDownIcon />
           ) : (
             open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
           )
           }

          
                
           
          </IconButton>
        </TableCell>
        <TableCell align="left"><strong>{row.company}</strong></TableCell>
        <TableCell width={130} component="th" scope="row">
          {row.fecha}
        </TableCell>
        <TableCell style={{fontSize: 12}} align="left">{row.hours}</TableCell>
        <TableCell style={{fontSize: 12}} align="left">{row.client}</TableCell>
        <TableCell width={80} style={{fontSize: 12}}  align="left">{row.patent}</TableCell>
        <TableCell style={{fontSize: 12}}  align="left">{row.vehiclename}</TableCell>
        <TableCell style={{fontSize: 12}}  align="left">{row.installationtype}</TableCell>
        <TableCell style={{fontSize: 12}}  align="left">{row.address}</TableCell>
        <TableCell style={{fontSize: 12}}  align="left">{row.commune}</TableCell>
        <TableCell sx={ row.state === 'PENDIENTE' ? {color: 'red'} : {color: 'green'}} style={{fontSize: 12}}  align="left">{row.state}</TableCell>
        <TableCell style={ {fontSize: 12}}  align="left">{row.product.length}</TableCell>
        <TableCell width={250} style={{fontSize: 12}}  align="left">
          {lines.map((line, index) => (
            <p style={ line.length === 0 ? {margin: 5, height: 5} : {margin: 0}} key={index}>{line}</p>
          ))}
        </TableCell>
        <TableCell width={50} align="left">
          <ButtonGroup
            disableElevation
            style={{ alignItems: "center", justifyContent: "center" }}
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
             <Tooltip title="Editar">
              <IconButton onClick={handleClickOpen} aria-label="delete" size="small">
                <EditIcon fontSize="inherit" />
              </IconButton>
              </Tooltip>
              <Tooltip title="Eliminar">
              <IconButton  onClick={() => deleteInstallation(row?.id)} aria-label="delete" size="small">
                <DeleteIcon color="error" fontSize="inherit" />
              </IconButton>
              </Tooltip>
              <Tooltip title="Actualizar Pago">
              <IconButton  onClick={() => updateInstallation(row?.id, row.state)} aria-label="delete" size="small">
                <PaymentIcon fontSize="inherit" />
              </IconButton>
              </Tooltip>
          </ButtonGroup>
          <Stack spacing={1}></Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={13}>
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
                  {row.product?.map(
                    (historyRow, index) =>
                      historyRow != undefined && (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            {historyRow.name}
                          </TableCell>
                          <TableCell>{historyRow.imeigps}</TableCell>
                          <TableCell align="right">
                            {historyRow.tipochip}
                          </TableCell>
                          <TableCell align="right">
                            {historyRow.numerochip}
                          </TableCell>
                          <TableCell align="right">
                            $ {formatClp(`${historyRow.cost}`)}
                          </TableCell>
                          <TableCell align="right">
                            $ {formatClp(`${historyRow?.value}`)}
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
      <ModalUpdate
        open={openUpdate}
        setOpen={setOpenUpdate}
        row={row}
        client={client}
        fetchInstalattion={fetchInstalattion}
      />
    </React.Fragment>
  );
}
