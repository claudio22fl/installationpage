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
import { Row2 } from "./Row";
import {
  IconButton,
  TableFooter,
  TablePagination,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { columns } from "../const";
import { empresa } from "@/types/Compani";

interface Props {
  empresas:  empresa[];
  client: client[];
  fetchInstalattion: () => void;
  instalattion: fotmatAttributes[];
}

export default function CollapsibleTable({
  empresas,
  client,
  fetchInstalattion,
  instalattion,
}: Props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState<string>(""); // Estado para almacenar el término de búsqueda
  const [Pagination, setPagination] = useState<empresa[]>([]);
  const [newPagination, setNewPagination] = useState<empresa[]>([]);
  const [showFields, setShowFields] = useState<boolean>(false); // Estado para controlar la visibilidad de los campos
  const [orderFiels, setOrderFiels] = useState<boolean[]>([false,false,false,false,false]);

  const handleToggleField = () => {
    // Cambiar el estado de visibilidad del campo en el índice especificado

    if (showFields == true) {
      setNewPagination(empresas);
      setPagination(empresas);
    }

    setShowFields(!showFields);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setPagination(
      newPagination.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );

  }, [page, rowsPerPage, empresas, newPagination]);

  useEffect(() => {
    setNewPagination([...empresas]);
  }, [empresas]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Actualiza el estado del término de búsqueda al escribir en el campo de búsqueda
    const value = event.target.value;
    const namae: any = event.target.name;
    setSearchTerm(value);
    // Filtra los resultados de la búsqueda por varios campos dependiendo de que campo viene en el name
    const newPagination = empresas.filter((row: any) => {
      type ISimKey = keyof typeof row;

      return row[namae]?.toLowerCase().includes(value.toLowerCase());
    });
    // Actualiza el estado de la paginación
    setPagination(newPagination);
    setNewPagination(newPagination);
  };

  const ordenarIntalacionesAlfabeticamente = (dato: any, active: boolean, id: number) => {
    // ordenar de la a a la z las companias y si esta de a a la z ordenar de la z a la a
    const OrderPagination = empresas.sort((a: any, b: any) => {
      if (a[dato] < b[dato]) {
        return active ? 1 : -1;
      }
      if (a[dato] > b[dato]) {
        return active ? -1 : 1;
      }
      return 0;
    });
    // Actualiza el estado de la paginación
    const newShowFields = [...orderFiels];
    newShowFields[id] = !newShowFields[id];
    setOrderFiels(newShowFields);
    setPagination(OrderPagination);
    setNewPagination(OrderPagination);
  };


  return (
    <>
      <TableContainer sx={{ minWidth: "99%" }} component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>
                <IconButton aria-label="delete" size="small">
                  <FilterAltIcon
                    onClick={() => handleToggleField()}
                    fontSize="inherit"
                  />
                </IconButton>
              </TableCell>
              {columns.map((columns, index) => (
                <TableCell 
                  align="left"
                  sx={{paddingLeft: 0}}
                  onClick={() =>
                    ordenarIntalacionesAlfabeticamente(columns.data, orderFiels[index], index)
                  }
                  style={{ cursor: "pointer" }}
                  key={index}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "left",
                      justifyContent: "flex-start",
                      marginLeft: 0,
                    }}
                  >
                    {columns.label != "Acciones" && columns.label != "DI" && (
                      <IconButton aria-label="delete" size="small">
                        {orderFiels[index] ? (
                          <ArrowDownwardIcon fontSize="inherit" />
                        ) : (
                          <ArrowUpwardIcon fontSize="inherit" />
                        )}
                      </IconButton>
                    )}

                    {columns.label}
                  </div>
                  {showFields && columns.label != "Acciones" && columns.label != "DI" &&  (
                    <TextField
                      label={columns.label}
                      variant="standard"
                      name={columns.data}
                      onChange={handleSearch}
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Pagination.map((row) => (
              <Row2
                 key={row.id}
                 row={row}
                 client={client}
                 fetchInstalattion={fetchInstalattion}
                 instalattion={instalattion}
               />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 20, 100, { label: "All", value: -1 }]}
                colSpan={12}
                count={newPagination.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "Instalaciones por pagina",
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
