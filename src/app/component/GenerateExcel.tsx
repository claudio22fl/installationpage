import React from "react";
import * as ExcelJS from "exceljs";
import ExcelIcon from "./ExcelIcon";
import { fotmatAttributes } from "@/types/Installation";
import { empresa } from "@/types/Compani";
import Swal from "sweetalert2";

interface Props {
  instalattion: fotmatAttributes[];
  empresas: empresa[];
  personName: string[];
}

const ExcelGenerator: React.FC<Props> = ({
  instalattion,
  empresas,
  personName,
}: Props) => {
  const generateExcel = () => {
    const workbook = new ExcelJS.Workbook();
    // Itera sobre cada cliente
    empresas.forEach((empresas) => {
      if (personName.length > 0) {
        if (
          personName.includes(empresas.label ? empresas.label : "sin datos")
        ) {
          const worksheet = workbook.addWorksheet(empresas.label); // Nombre de la hoja como el nombre del cliente

          worksheet.columns = [
            { header: "Fecha", key: "fecha", width: 10 },
            { header: "Dispositivo", key: "dispositivo", width: 20 },
            { header: "Patente", key: "patente", width: 20 },
            { header: "Marca", key: "marca", width: 20 },
            { header: "Direccion", key: "direccion", width: 20 },
            { header: "Comuna", key: "comuna", width: 20 },
            { header: "Valor", key: "valor", width: 20 },
            { header: "Costo", key: "costo", width: 20 },
            { header: "Notas", key: "nota", width: 20 },
          ];

          // Filtra los datos de instalaciones para el cliente actual
          const dataCliente = instalattion.filter(
            (instalacion) => instalacion.company === empresas.label
          );

          dataCliente.forEach((row) => {
            // Agrega filas para cada dato de instalación
            row.product?.forEach((product) => {
              worksheet.addRow({
                fecha: row.fecha,
                dispositivo: product?.name,
                patente: row.patent,
                marca: row.vehiclename,
                direccion: row.address,
                comuna: row.commune,
                valor: product?.cost,
                costo: product?.value,
                nota: row.note,
              });
            });

            if (worksheet.columns.length > 0) {
              worksheet.columns.forEach((column) => {
                let maxLength = 0;

                worksheet.eachRow({ includeEmpty: true }, (row) => {
                  if (column.key !== undefined) {
                    const cell = row.getCell(column.key);
                    if (
                      cell &&
                      cell.value !== undefined &&
                      cell.value !== null
                    ) {
                      const columnLength = cell.value.toString().length;
                      if (columnLength > maxLength) {
                        maxLength = columnLength;
                      }
                    }
                  }
                });

                column.width = maxLength < 10 ? 10 : maxLength + 2;
              });
            }
          });
        }
        workbook.xlsx.writeBuffer().then((buffer) => {
          const blob = new Blob([buffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });

          // Crear un enlace para descargar el archivo
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "mi_archivo_excel.xlsx";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No hay empresas seleccionadas",
        });
      }
    });
  };

  const generarSwalExcel = () => {
    Swal.fire({
      title: "Generar Excel",
      text: "¿Estas seguro de generar el excel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        generateExcel();
      }
    });
  };

  return (
    <div>
      <ExcelIcon onClick={generarSwalExcel} />
    </div>
  );
};

export default ExcelGenerator;
