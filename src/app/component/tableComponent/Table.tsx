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
import { Button } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";

function ccyFormat(num: number) {
  return `$ ${num}`;
}

export function createData(
    name: string,
    cost: number,
    value: number,
    imeigps: string,
    tipochip: string,
    numerochip: string,
  ) {
    return { name, cost, value, imeigps, tipochip, numerochip };
  }

interface Row {
    name: string,
    cost: number,
    value: number,
    imeigps: string,
    tipochip: string,
    numerochip: string,
}

function subtotal(items: Row[]) {
  return items.map(({ value }) => value).reduce((sum, i) => sum + i, 0);
}



interface Pods {
    rows: Irows[]
    setRows: React.Dispatch<React.SetStateAction<Irows[]>>
}



export default function SpanningTable({rows,setRows}: Pods) {
    const invoiceSubtotal = subtotal(rows as any);


    const deleteRow = (index: number)  => {
      console.log(index);
        const newRows = [...rows];
        newRows.splice(index, 1);
        console.log(newRows);
        setRows(newRows);
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
            <TableCell align="right">Precio.</TableCell>
            <TableCell style={{width: 50}} align="center">Borrar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.imeigps}</TableCell>
              <TableCell align="right">{row.tipochip}</TableCell>
              <TableCell align="right">{row.numerochip}</TableCell>
              <TableCell align="right">$ {formatClp(`${row.cost}`)}</TableCell>
              <TableCell align="right">$ {formatClp(`${row.value}`)}</TableCell>
              <TableCell align="right"> <Button onClick={() => deleteRow(index)} variant="outlined" color="error" startIcon={<DeleteIcon />}>
            </Button></TableCell>
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
