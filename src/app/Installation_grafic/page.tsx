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
import { useSelectedMonth } from "../hooks/useSelectedMonth";
import { getMonth } from "@/utils/const";
import MonthSelect from "../component/MonthSelect";
import ExcelGenerator from "../component/GenerateExcel";

export default function page() {
  const [instalattionCompani, setIntalattionCompani] = useState<
    fotmatAttributes[]
  >([]);
  const { instalattion, fetchInstalattion } = useFetchInstallation();
  const { compani, fetchCompani } = useFetchCompani();
  const { client } = useFetchClient();
  var empresa: any = '';
  var rol : any= '';

  try {
    empresa = localStorage.getItem('empresa');
    rol = localStorage.getItem('rol');
  } catch (error) {
    empresa = '';
    rol = '';
  }
  const [inicialMonth, setInicialMonth] = React.useState(getMonth());
  const [finalMonth, setFinalMonth] = React.useState(getMonth());
  const { newInstallation } = useSelectedMonth(
    rol === "user" ? instalattionCompani : instalattion,
    inicialMonth,
    finalMonth
  );
  const companies = compani.filter((compani) => {
    return compani.label === empresa;
  });

  useEffect(() => {
    if (empresa) {
      //filtrar por empresa
      const installationsCompany = instalattion.filter((installation: any) => {
        return installation.company === empresa;
      });
      // Establecer el objeto de instalaciones por empresa en el estado
      setIntalattionCompani(installationsCompany);
    }
  }, [instalattion]);

  return (
    <main>
      <div
        style={{
          maxWidth: "1650px",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 30,
        }}
      >
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Reportes</h6>
          </div>
        </div>
        <div
          className="bg-white mb-0 px-6 py-6"
          style={{ gap: 30, display: "flex" }}
        >
          <div>
            <h6 className="text-blueGray-700 text-xl font-bold">Mes Inicial</h6>
            <MonthSelect month={inicialMonth} setMonth={setInicialMonth} />
          </div>
          <div style={{ marginLeft: 20 }}>
            <h6 className="text-blueGray-700 text-xl font-bold">Mes Final</h6>
            <MonthSelect month={finalMonth} setMonth={setFinalMonth} />
          </div>
        </div>

        <div className="flex flex-col rounded-xl" style={{ fontSize: 1 }}>
          <CollapsibleTable
            empresas={rol === "admin" ? compani : companies }
            client={client}
            fetchInstalattion={fetchInstalattion}
            instalattion={newInstallation}
          />
        </div>
      </div>
    </main>
  );
}
