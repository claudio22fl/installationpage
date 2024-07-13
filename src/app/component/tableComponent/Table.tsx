import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Irows } from '@/types/Types';
import { formatClp } from '@/utils/const';
import { Button, TextField } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { fotmatAttributes } from '@/types/Installation';

export function createData(
  name: string,
  cost: number,
  value: number,
  imeigps: string,
  tipochip: string,
  numerochip: string,
  percentaje: number
) {
  return { name, cost, value, imeigps, tipochip, numerochip, percentaje };
}

interface Row {
  name: string,
  cost: number,
  value: number,
  imeigps: string,
  tipochip: string,
  numerochip: string,
  percentaje: number
}

function subtotal(items: Row[]) {
  return items.map(({ value }) => value).reduce((sum, i) => sum + i, 0);
}

interface Pods {
  rows: Irows[]
  setRows: React.Dispatch<React.SetStateAction<Irows[]>>
  setFormData: React.Dispatch<React.SetStateAction<any>>
  formData: fotmatAttributes
}

export default function SpanningTable({ rows, setRows, setFormData, formData }: Pods) {
  const invoiceSubtotal = subtotal(rows as any);

  const deleteRow = (index: number) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
    setFormData({
      ...formData,
      ["product"]: newRows,
    });
  }

  const handleInputChange = (index: number, field: keyof Row, value: string) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [field]: parseFloat(value) || 0 };
    setRows(newRows);
    setFormData({
      ...formData,
      ["product"]: newRows,
    });
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={5}>
              Detalles
            </TableCell>
            <TableCell align="right">Precios</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Dispositivo</TableCell>
            <TableCell align="right">ImeiGPS</TableCell>
            <TableCell align="right">Tipo Chip</TableCell>
            <TableCell align="right">Numero Chip</TableCell>
            <TableCell align="right">Valor&nbsp;(costo)</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell style={{ width: 50 }} align="center">Borrar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.imeigps}</TableCell>
              <TableCell align="right">{row.tipochip}</TableCell>
              <TableCell align="right">{row.numerochip}</TableCell>
              <TableCell align="right">
                <TextField
                  value={row.cost}
                  onChange={(e) => handleInputChange(index, 'cost', e.target.value)}
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <TextField
                  value={row.value}
                  onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => deleteRow(index)} variant="outlined" color="error" startIcon={<DeleteIcon />}>
                  Borrar
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={1} />
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell align="right">$ {formatClp(`${invoiceSubtotal}`)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
