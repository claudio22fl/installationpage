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
import { TableFooter, TablePagination } from "@mui/material";


interface Props {
  instalattion: fotmatAttributes[];
  client: client[];
  fetchInstalattion: () => void;
}

export default function CollapsibleTable({ instalattion, client,fetchInstalattion}: Props) {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - instalattion.length) : 0;

const handleChangePage = (
  event: React.MouseEvent<HTMLButtonElement> | null,
  newPage: number,
) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
};

 const Pagination = instalattion.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

 const filter = instalattion.filter((row) => row.client?.toLowerCase().includes('sims'));

  return (
    <>
    <TableContainer sx={{ minWidth: '99%' }} component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Empresa</TableCell>
            <TableCell align="left">Fecha</TableCell>
            <TableCell align="left">Hora</TableCell>
            <TableCell align="left">Cliente</TableCell>
            <TableCell align="left">Pantene</TableCell>
            <TableCell align="left">Vehiculo</TableCell>
            <TableCell align="left">Tipo</TableCell>
            <TableCell align="left">Direccion</TableCell>
            <TableCell align="left">Comuna</TableCell>
            <TableCell align="left">DI</TableCell>
            <TableCell align="left">Notas</TableCell>
            <TableCell align="left">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Pagination.map((row) => (
            <Row key={row.id} row={row} client={client} fetchInstalattion= {fetchInstalattion} />
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 20, 100, { label: 'All', value: -1 }]}
              colSpan={12}
              count={instalattion.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'Instalaciones por pagina',
                },
                native: false,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
   
    </>
  );
}
