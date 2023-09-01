
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