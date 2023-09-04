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

interface Props {
  row: fotmatAttributes;
  client: client[];
}

export function Row({ row, client }: Props) {
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

  const { deleteInstallation } = useDeleteInstallation();

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
        <TableCell width={150} component="th" scope="row">
          {row.fecha}
        </TableCell>
        <TableCell align="left">{row.client}</TableCell>
        <TableCell align="left">{row.patent}</TableCell>
        <TableCell align="left">{row.vehiclename}</TableCell>
        <TableCell align="left">{row.installationtype}</TableCell>
        <TableCell align="left">{row.address}</TableCell>
        <TableCell align="left">{row.product.length}</TableCell>
        <TableCell align="left">
          {" "}
          {lines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </TableCell>
        <TableCell width={50} align="left">
          <ButtonGroup
            disableElevation
            style={{ alignItems: "center", justifyContent: "center" }}
            variant="contained"
            aria-label="Disabled elevation buttons"
          >
            <Button onClick={handleClickOpen} variant="outlined">
              <IconButton aria-label="delete" size="small">
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Button>

            <Button
              onClick={() => deleteInstallation(row?.id)}
              variant="outlined"
              color="error"
            >
              <IconButton aria-label="delete" size="small">
                <DeleteIcon color="error" fontSize="inherit" />
              </IconButton>
            </Button>
          </ButtonGroup>
          <Stack spacing={1}></Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
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
                            {historyRow?.tipochip}
                          </TableCell>
                          <TableCell align="right">
                            {historyRow?.numerochip}
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
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell align="right">
                      $ {formatClp(`${total}`)}
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
      />
    </React.Fragment>
  );
}
