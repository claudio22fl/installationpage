
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

