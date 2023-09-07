"use client";
import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import "../Installation/styles.css";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useFetchInstallation } from "../services/Intallation";
import { useFetchCompani } from "../services/Compani";
import { fotmatAttributes } from "@/types/Installation";
import CollapsibleTable from "./component/Table";
import { useFetchClient } from "../services/Client";

export default function page() {
    const [ instalattionCompani, setIntalattionCompani ] = useState<any>([]) 
    const { instalattion, fetchInstalattion } = useFetchInstallation();
    const { compani, fetchCompani } = useFetchCompani();
    const { client } = useFetchClient();
    const empresas = compani;




    useEffect(() => {
        if (empresas) {
            const companyInstallationMap: any = {}; // Objeto para almacenar las instalaciones por nombre de empresa
    
            empresas.forEach((element) => {
                const companyInstallations = instalattion.filter((instalattion) => instalattion.company === element.label);
                // Asignar las instalaciones al objeto usando el nombre de la empresa como clave
                if (element.label !== undefined){
                    companyInstallationMap[element.label] = companyInstallations;
                }
             
            });
    
            // Establecer el objeto de instalaciones por empresa en el estado
            setIntalattionCompani(companyInstallationMap);
        }
    
        console.log(instalattion)

    }, [empresas]);
    

  return (
    <main>
      <Container maxWidth="xl">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Reportes</h6>
          </div>
        </div>

        <div className="text-center flex flex-col rounded-xl" style={{fontSize: 1}}>
        <CollapsibleTable empresas={empresas} client = {client} fetchInstalattion={fetchInstalattion} instalattion={instalattion} />
          </div>
      </Container>
    </main>
  );
}
