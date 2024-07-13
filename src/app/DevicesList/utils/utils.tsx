import { empresa } from "@/types/Compani";
import { fotmatAttributes } from "@/types/Installation";

export interface IutilsProps {
  data: fotmatAttributes[];
}

export const utils = ({ data }: IutilsProps) => {
  const sumaCostos = data.reduce((total, item) => {
    // sumar cost siempre que label no sea chip
    const costoTotal = item.product.reduce(
      (subtotal, producto) =>
        subtotal +
        (producto?.cost === undefined
          ? 0
          : producto.name?.includes("M2M")
          ? 0
          : producto.cost),
      0
    );
    return total + costoTotal;
  }, 0);


  const sumaValue = data.reduce((total, item) => {
    const costoTotal = item.product.reduce(
      (subtotal, producto) =>
        subtotal +
        (producto?.value === undefined
          ? 0
          : producto.name?.includes("M2M")
          ? 0
          : producto.value),
      0
    );
    return total + costoTotal;
  }, 0);


  const sumaValueChip = data.reduce((total, item) => {
    const costoTotal = item.product.reduce(
      (subtotal, producto) =>
        subtotal +
        (producto?.value === undefined
          ? 0
          : producto.name?.includes("M2M")
          ? producto.value
          : 0),
      0
    );
    return total + costoTotal;
  }, 0);

  const countRevisions = data.reduce((count, item) => {
    // Verificar si item.product existe y es un arreglo con al menos un elemento
    if (Array.isArray(item.product) && item.product.length > 0) {
      // Verificar si algún producto tiene el nombre "revicion" (corregido a "revision")
      if (item.product.some((product) => product.name === "GARANTIA")) {
        return count + 1; // Incrementar el contador si se encuentra "revision"
      }
    }
    return count; // Mantener el contador sin cambios si no se encuentra "revision" o no hay productos
  }, 0);

  return { sumaValue, sumaValueChip, countRevisions, sumaCostos };
};

export function calcularTotal(sumaValue: number, sumaCostos: number, row: empresa) {
  const porcentaje = row.percentage === 0 ? 1 : row.percentage / 100;
  const resultado = (sumaValue - sumaCostos) * porcentaje;
  return resultado;
}

