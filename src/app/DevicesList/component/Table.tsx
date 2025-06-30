"use client";
import { useFetchCompani } from "@/app/services/Compani";
import { client } from "@/types/Client";
import { fotmatAttributes } from "@/types/Installation";
import { formatClp } from "@/utils/const";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TableFooter,
  TablePagination,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import { useEffect, useState } from "react";
import { Row2 } from "./Row";
import TableHeadComponent from "./TableHead";

interface Props {
  empresas: string[];
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
  const [Pagination, setPagination] = useState<string[]>([]);
  const [newPagination, setNewPagination] = useState<string[]>([]);
  const [showFields, setShowFields] = useState<boolean>(false); // Estado para controlar la visibilidad de los campos
  const [orderFiels, setOrderFiels] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const { compani, fetchCompani } = useFetchCompani();

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

  const [openDetalles, setOpenDetalles] = React.useState<boolean>(false);

  const handleToggleDetalles = () => {
    setOpenDetalles(!openDetalles);
  };

  const [personName, setPersonName] = React.useState<string[]>([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const names = empresas.map((empresa) => empresa);
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const [loading, setLoading] = useState<boolean>(false);
  var empresa: any = "";
  var rol: any = "";

  try {
    empresa = localStorage.getItem("empresa");
    rol = localStorage.getItem("rol");
  } catch (error) {
    empresa = "";
    rol = "";
  }

  const totalCost = instalattion.reduce(
    (total, inst) =>
      total + inst.product.reduce((totalp, p) => totalp + p.cost, 0),
    0
  );
  const totalValue = instalattion.reduce(
    (total, inst) =>
      total + inst.product.reduce((totalp, p) => totalp + p.value, 0),
    0
  );
  const totalWithDiscount = instalattion.reduce((total, inst) => {
    const company = compani.find((em) => em.label === inst.company);
    const discountPercentage = company ? company.percentage : 0;

    const productTotal = inst.product.reduce((totalp, p) => {
      const discount =
        (p.value - p.cost) *
        (p.percentaje ? p.percentaje / 100 : discountPercentage / 100);
      return totalp + (p.value - p.cost - discount);
    }, 0);

    return total + productTotal;
  }, 0);

  return (
    <>
      <TableContainer sx={{ minWidth: "99%" }} component={Paper}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {rol === "admin" && (
            <Button onClick={handleToggleDetalles}>Detalles</Button>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl sx={{ m: 1, width: 200, fontSize: 1 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Dispositivos
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={personName}
                sx={{ fontSize: 13 }}
                onChange={handleChange}
                input={<OutlinedInput label="Dispositivos" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem sx={{ fontSize: 13 }} key={name} value={name}>
                    <Checkbox checked={personName.indexOf(name as any) > -1} />
                    <ListItemText sx={{ fontSize: 13 }} primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div
              style={{
                display: "flex",
                width: 50,
                justifyContent: "space-around",
                marginLeft: 25,
                gap: 10,
              }}
            ></div>

            {loading && <CircularProgress />}
          </div>
        </div>

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
                final={6}
              />
            </TableRow>
          </TableHead>
          <TableBody>
            {Pagination.map((row, index) => (
              <Row2
                key={index}
                compani={compani}
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
                <strong>
                  {instalattion.reduce(
                    (total, inst) => total + inst.product.length,
                    0
                  )}
                </strong>
              </TableCell>
              <TableCell>
                <strong>
                  $
                  {formatClp(
                    instalattion
                      .reduce(
                        (total, inst) =>
                          total +
                          inst.product.reduce(
                            (totalp, p) => totalp + p.cost,
                            0
                          ),
                        0
                      )
                      .toString()
                  )}
                </strong>
              </TableCell>
              <TableCell>
                <strong>
                  $
                  {formatClp(
                    instalattion
                      .reduce(
                        (total, inst) =>
                          total +
                          inst.product.reduce(
                            (totalp, p) => totalp + p.value,
                            0
                          ),
                        0
                      )
                      .toString()
                  )}
                </strong>
              </TableCell>
              <TableCell>
                <strong>
                  ${formatClp((totalValue - totalCost).toString())}
                </strong>
              </TableCell>
              <TableCell>
                <strong>${formatClp(totalWithDiscount.toString())}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  10,
                  20,
                  100,
                  { label: "All", value: 10000 },
                ]}
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
