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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDeleteInstallation } from "@/app/services/Intallation";
import { formatClp, formatearFecha, sumarMesesALaFecha } from "@/utils/const";
import ModalUpdate from "@/app/Installation_list/component/ModalUpdate";
import { client } from "@/types/Client";
import { Padding } from "@mui/icons-material";
import { formatRow } from "@/types/Types";
import { useFetchHistory } from "@/app/services/History";
import { history } from "@/types/History";

interface Props {
  row: formatRow;
  client: client[];
  fetchInstalattion: () => void;
  selectedRows: never[];
  handleCheckboxChange: (id: never) => void;
}

export function HistorySims({
  row,
  client,
  fetchInstalattion,
  selectedRows,
  handleCheckboxChange,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const { history } = useFetchHistory(row.id as never);
  const [lastHistory, setLastHistory] = React.useState<history>();

  //obtener ultimo historial por id

  React.useEffect(() => {
    if (history == undefined) return;

    setLastHistory(history[history.length - 1]);
  }, [history]);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell style={{ width: 20 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Checkbox
            checked={selectedRows.includes(row.id as never)}
            onChange={() => handleCheckboxChange(row.id as never)}
          />
        </TableCell>
        <TableCell>
          <strong>{row.compani}</strong>
        </TableCell>
        <TableCell>{row.fehchaInsta}</TableCell>
        <TableCell>
          {row.producto != undefined &&
              sumarMesesALaFecha(row.fehchaInsta, row.producto)
            }
        </TableCell>
        <TableCell>
          {lastHistory == undefined
            ? row.producto != undefined &&
              sumarMesesALaFecha(row.fehchaInsta, row.producto)
            : sumarMesesALaFecha(
                formatearFecha(lastHistory.renewal),
                `${lastHistory.months}`
              )}
        </TableCell>
        <TableCell style={{ fontSize: 12 }}>{row.producto}</TableCell>
        <TableCell style={{ fontSize: 12 }}>{row.id}</TableCell>
        <TableCell style={{ fontSize: 12 }}>
          $ {formatClp(`${row.cost}`)}
        </TableCell>
        <TableCell style={{ fontSize: 12 }}>
          $ {formatClp(`${row.value}`)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Historial
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Fecha</TableCell>
                    <TableCell align="center">Meses</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history?.map(
                    (historyRow, index) =>
                      historyRow != undefined && (
                        <TableRow key={index}>
                          <TableCell align="center">
                            {formatearFecha(historyRow.renewal)}
                          </TableCell>
                          <TableCell align="center">
                            {historyRow.months}
                          </TableCell>
                        </TableRow>
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
