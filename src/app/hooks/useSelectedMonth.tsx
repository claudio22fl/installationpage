import { fotmatAttributes } from "@/types/Installation";
import { useState } from "react";

export const useSelectedMonth = (installation : fotmatAttributes[], month: number) => {
    

    const newInstallation = installation.filter((item) => {
        const fecha = obtenerMes(item.fecha);
      
        return fecha === month;
    }
    );

    console.log(newInstallation);

   return {newInstallation}
   
}

function obtenerMes(fecha: string) {
    // Dividir la fecha en partes usando "-" como separador
    const partesFecha = fecha.split('-');
    
    // La segunda parte representa el mes en formato "09"
    const mes = partesFecha[1];
    
    // Si deseas obtener el mes como un número en lugar de una cadena, puedes hacerlo así:
    const numeroMes = parseInt(mes, 10);
    
    return numeroMes;
  }