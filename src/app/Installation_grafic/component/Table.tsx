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
  Button,
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
import { formatClp } from "@/utils/const";
import { Producto } from "@/types/Product";
import TableHeadComponent from "./TableHead";
import { CheckBox } from "@mui/icons-material";

interface Props {
  empresas: empresa[];
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
  const [orderFiels, setOrderFiels] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

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

  const ordenarIntalacionesAlfabeticamente = (
    dato: any,
    active: boolean,
    id: number
  ) => {
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

  const bruto = instalattion.reduce((accumulator, item) => {
    const m2mProducts = item.product.filter((product) =>
      product.name?.includes("")
    );

    const m2mCost = m2mProducts.reduce((productAccumulator, product) => {
      return productAccumulator + (product.value || 0);
    }, 0);

    return accumulator + m2mCost;
  }, 0);

  const cost = instalattion.reduce((accumulator, item) => {
    const m2mProducts = item.product.filter((product) =>
      product.name?.includes("")
    );

    const m2mCost = m2mProducts.reduce((productAccumulator, product) => {
      return productAccumulator + (product.cost || 0);
    }, 0);

    return accumulator + m2mCost;
  }, 0);

  function calcularValorConDescuento(producto: Producto, porcentaje: number) {
    const valorDescontado = producto.value - producto.cost; // Restar el costo al valor
    return valorDescontado - (valorDescontado * porcentaje) / 100; // Aplicar el porcentaje de descuento
  }

  // Calcular el total de los productos con descuento
  const totalConDescuento = instalattion.reduce((total, instalacion) => {
    // Suma el valor de los productos en esta instalación con el descuento aplicado
    const valorInstalacion = instalacion.product.reduce(
      (subtotal, producto) => {
        const empresa = empresas.find((e) => e.label === instalacion.company);
        if (empresa !== undefined) {
          // Calcular el valor del producto restando el costo y luego aplicar el descuento de la empresa
          const valorConDescuento = calcularValorConDescuento(
            producto,
            empresa.percentage
          );
          return subtotal + valorConDescuento;
        } else {
          // Si no se encuentra la empresa, usar el valor sin descuento
          return subtotal + producto.value;
        }
      },
      0
    );

    return total + valorInstalacion;
  }, 0);

  console.log(`Total con descuento: ${totalConDescuento}`);

  const countRevisions = instalattion.reduce((count, item) => {
    // Verificar si item.product existe y es un arreglo con al menos un elemento
    if (Array.isArray(item.product) && item.product.length > 0) {
      // Verificar si algún producto tiene el nombre "revicion" (corregido a "revision")
      if (item.product.some((product) => product.name === "GARANTIA")) {
        return count + 1; // Incrementar el contador si se encuentra "revision"
      }
    }
    return count; // Mantener el contador sin cambios si no se encuentra "revision" o no hay productos
  }, 0);

  const [openDetalles, setOpenDetalles] = React.useState<boolean>(false);

   const handleToggleDetalles = () => {
    setOpenDetalles(!openDetalles);
  };

  return (
    <>
    
      <TableContainer sx={{ minWidth: "99%" }} component={Paper}>
       <Button onClick={handleToggleDetalles}>Detalles</Button>
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
              <TableHeadComponent
                ordenarIntalacionesAlfabeticamente={
                  ordenarIntalacionesAlfabeticamente
                }
                orderFiels={orderFiels}
                showFields={showFields}
                handleSearch={handleSearch}
                inicio={0}
                final={3}
              />
              {openDetalles && (
                <TableHeadComponent
                ordenarIntalacionesAlfabeticamente={
                  ordenarIntalacionesAlfabeticamente
                }
                orderFiels={orderFiels}
                showFields={showFields}
                handleSearch={handleSearch}
                inicio={3}
                final={7}
              />
              )
              }
              
                 <TableHeadComponent
                ordenarIntalacionesAlfabeticamente={
                  ordenarIntalacionesAlfabeticamente
                }
                orderFiels={orderFiels}
                showFields={showFields}
                handleSearch={handleSearch}
                inicio={7}
                final={11}
              />
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
                openDetalles={openDetalles}
              />
            ))}
            <TableRow>
              <TableCell rowSpan={2} />
              <TableCell colSpan={0}>
                <strong>Total</strong>
              </TableCell>
              <TableCell>
                <strong>{instalattion.length}</strong>
              </TableCell>
              <TableCell>
                <strong>{countRevisions}</strong>
              </TableCell>
              {openDetalles && (
                <>
                <TableCell>
                <strong>
                  {instalattion
                    .map((item) => (item.state === "PENDIENTE" ? 1 : 0))
                    .reduce((a, b) => (a + b) as any, 0)}
                </strong>
              </TableCell>
              <TableCell>
                <strong>
                  {instalattion
                    .map((item) => (item.state === "EFECTIVO" ? 1 : 0))
                    .reduce((a, b) => (a + b) as any, 0)}
                </strong>
              </TableCell>
              <TableCell>
                <strong>
                  {instalattion
                    .map((item) => (item.state === "TRANSFERENCIA" ? 1 : 0))
                    .reduce((a, b) => (a + b) as any, 0)}
                </strong>
              </TableCell>
              <TableCell>
                <strong>
                  {instalattion
                    .map((item) => (item.state === "PAGADO" ? 1 : 0))
                    .reduce((a, b) => (a + b) as any, 0)}
                </strong>
              </TableCell>
                </>
              )
                }
              
              <TableCell>
                <strong>$ {formatClp(`${bruto}`)}</strong>
              </TableCell>
              <TableCell>
                <strong>$ {formatClp(`${cost}`)}</strong>
              </TableCell>
              <TableCell>
                <strong>$ {formatClp(`${totalConDescuento}`)}</strong>
              </TableCell>
              <TableCell>
                <strong>$ {formatClp(`${totalConDescuento + cost}`)}</strong>
              </TableCell>
            </TableRow>
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
