import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Swal from "sweetalert2";
import ExcelIcon from "./ExcelIcon";
import { fotmatAttributes } from "@/types/Installation";
import { empresa } from "@/types/Compani";
import { formatClp } from "@/utils/const";
import logoImage from "../assets/logo-main.png";

interface Props {
  instalattion: fotmatAttributes[];
  empresas: empresa[];
  personName: string[];
}

const PdfGenerator: React.FC<Props> = ({
  instalattion,
  empresas,
  personName,
}: Props) => {

  // filtrar instalattion por empresa
  const instalattionEmpresa = instalattion.filter((instalacion) =>
    instalacion.company?.includes(personName[0])
  );


  const bruto = instalattionEmpresa.reduce((accumulator, item) => {
    const m2mProducts = item.product.filter((product) =>
      product.name?.includes("")
    );

    //filtrar por empresa

    const m2mCost = m2mProducts.reduce((productAccumulator, product) => {
      return productAccumulator + (product.value || 0);
    }, 0);

    return accumulator + m2mCost;
  }, 0);

  const cost = instalattionEmpresa.reduce((accumulator, item) => {
    const m2mProducts = item.product.filter((product) =>
      product.name?.includes("")
    );

    const m2mCost = m2mProducts.reduce((productAccumulator, product) => {
      return productAccumulator + (product.cost || 0);
    }, 0);

    return accumulator + m2mCost;
  }, 0);


  const generatePdf = () => {
    const doc : any = new jsPDF({
      orientation: "landscape", // Establecer orientación horizontal
    });
    
    const logoWidth = 15; // Ancho del logotipo
    const logoHeight = 15; // Alto del logotipo
    const logoX = 2; // Posición X del logotipo
    const logoY = 2; // Posición Y del logotipo
    var img = new Image()
     img.src = 'https://nsgps.cl/images/logo-main.png?t=1689018124'

    doc.addImage(img, 'png',logoX, logoY, logoWidth, logoHeight);


    // Configurar encabezados para el PDF
    const headers = [
      "Id",
      "Fecha",
      "Dispositivo",
      "Patente",
      "Marca",
      "Direccion",
      "Comuna",
      "Costo",
      "Valor",
      "Notas",
    ];

    // Datos para el PDF
    const data :any = [];
    let contador = 1;
    // Itera sobre cada cliente
    empresas.forEach((empresa) => {
      if (personName.length > 0) {
        if (personName.includes(empresa.label ? empresa.label : "sin datos")) {
          // Filtra los datos de instalaciones para el cliente actual
          const dataCliente = instalattion.filter(
            (instalacion) => instalacion.company === empresa.label
          );

          dataCliente.forEach((row) => {
            
            // Agrega filas para cada dato de instalación
            row.product?.forEach((product) => {
              data.push([
                contador++,
                row.fecha,
                product?.name,
                row.patent,
                row.vehiclename,
                row.address,
                row.commune,
                formatClp(`$ ${product?.cost}`),
                formatClp(`$ ${product?.value}`),
                row.note,
              ]);
            });
          });
          data.push([
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            formatClp(`$ ${cost}`),
            formatClp(`$ ${bruto}`),
            '',
          ]);

        }
      }
    });

    if (data.length > 0) {
      doc.autoTable({
        head: [headers],
        body: data,
        startY: 20, // Puedes ajustar la posición inicial
        styles: {
          minCellHeight: 5, // Reducir la altura de las celdas
          fontSize: 6, // Reducir la fuente a la mitad
          valign: "middle",
          halign: "center",
        },
      });

      // Guardar o descargar el PDF
      doc.save(`${personName[0]}.pdf`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No hay datos para generar el PDF",
      });
    }
  };

  const generarSwalPdf = () => {
    Swal.fire({
      title: "Generar PDF",
      text: "¿Estás seguro de generar el PDF?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
       await  generatePdf();
      }
    });
  };

  return (
    <div>
      <ExcelIcon onClick={generarSwalPdf} />
    </div>
  );
};

export default PdfGenerator;
