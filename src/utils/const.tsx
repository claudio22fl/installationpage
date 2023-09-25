
export function formatFecha(fechaString: string) {
  const dateObject = new Date(fechaString);
  const formattedDate = dateObject.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formattedDate;
}
export const formatDateInputs = (date: string) => {
  const objDate = new Date(date);
  const year = objDate.getFullYear();
  const month = String(objDate.getMonth() + 1).padStart(2, "0");
  const day = String(objDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatHourInputs = (date: string) => {
  const objDate = new Date(date);
  const hours = String(objDate.getHours()).padStart(2, "0");
  const minutes = String(objDate.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}:00`;
}

export const formatClp = (value: string) => {
  const cleanedValue = value.replace(/[,\.]/g, "");
  return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};


export function formatearFecha(fecha: string) {
  const partes = fecha.split('-'); // Dividir la fecha en partes: [año, mes, día]
  // Reorganizar las partes en el formato deseado: "dd-mm-yyyy"
  const fechaFormateada = `${partes[2]}-${partes[1]}-${partes[0]}`;
  
  return fechaFormateada;
}

export const formatFechaInput = (date: string) => {
  const partes = date.split('-'); // Dividir la fecha en partes: [año, mes, día]
  // Reorganizar las partes en el formato deseado: "dd-mm-yyyy"
  const fechaFormateada = `${partes[0]}/${partes[1]}/${partes[2]}`;
  
  return fechaFormateada;
}

export function formatPatente(patente: string) {
  // Eliminar caracteres no alfanuméricos y espacios
  const cleanedPatente = patente.replace(/[^0-9a-zA-Z]/g, "");

  if (cleanedPatente.length >= 6) {
    // Patente de automóvil (xx*xx*42)
    const formattedPatente = cleanedPatente.replace(/(.{2})(.{2})/, "$1*$2*");
    return formattedPatente;
  } else {
    // Patente de motocicleta (ccc*42)
    const formattedPatente = cleanedPatente.replace(/(.{3})/, "$1*");
    return formattedPatente;
  }
}


export function sumarMesesALaFecha(fecha: string, texto: string) {
  // Parsea la fecha en formato "DD-MM-YYYY" a objetos Date
  const partesFecha = fecha.split('-');
  const dia = parseInt(partesFecha[0], 10);
  const mes = parseInt(partesFecha[1], 10);
  const año = parseInt(partesFecha[2], 10);
  const fechaObj = new Date(año, mes - 1, dia); // Resta 1 al mes porque los meses van de 0 a 11 en JavaScript

  // Extrae la cantidad de meses del texto
  let meses;
  const partes = texto.split(/\D+/)
  if (partes.length < 3) {
     meses = Number(texto);
  }else{
     meses = Number(partes[2]);
  }
  // Suma los meses a la fecha
  fechaObj.setMonth(fechaObj.getMonth() + meses);

  // Formatea la nueva fecha en formato "DD-MM-YYYY"
  const nuevoDia = fechaObj.getDate().toString().padStart(2, '0');
  const nuevoMes = (fechaObj.getMonth() + 1).toString().padStart(2, '0'); // Suma 1 al mes porque los meses se muestran de 1 a 12
  const nuevoAño = fechaObj.getFullYear();

  return `${nuevoDia}-${nuevoMes}-${nuevoAño}`;
}

export const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const getMonth = () => {
  const date = new Date();
  const month = date.getMonth();
  return month + 1;
};