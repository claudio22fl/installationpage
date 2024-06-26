"use client";
import React, { use, useEffect, useState } from "react";
import styles from "../page.module.css";
import { useFetchInstallation } from "../services/Intallation";
import { Container } from "@mui/material";
import { useDataForm } from "../Installation/hooks/useDaraForm";
import "../Installation/styles.css";
import { useFetchClient } from "../services/Client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useFetchCompani } from "../services/Compani";
import CollapsibleTable from "./component/Table";
import { useFetchHistoryAll } from "../services/History";
import { getMonth } from "@/utils/const";
import { useSelectedMonth } from "../hooks/useSelectedMonth";
import MonthSelect from "../component/MonthSelect";

export default function page() {
  const { instalattion, fetchInstalattion } = useFetchInstallation();
  const { formData, setFormData } = useDataForm();
  const { client } = useFetchClient();
  const { compani, fetchCompani } = useFetchCompani();
  const { history } = useFetchHistoryAll();

  const [inicialMonth, setInicialMonth] = React.useState(getMonth());
  const [finalMonth, setFinalMonth] = React.useState(getMonth());
  const {newInstallation} = useSelectedMonth(instalattion, inicialMonth, finalMonth);

  function createData(
    name: any,
    calories: any,
    fat: any,
    carbs: any,
    protein: any,
    imeigps: any
  ) {
    return { name, calories, fat, carbs, protein, imeigps };
  }

  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    const newDataArray = instalattion.flatMap((instalattion) => {
      return instalattion.product.map((product) => {
        if (product.name?.includes("M2M")) {
          return createData(
            instalattion.company,
            instalattion.fecha,
            product.name,
            product.cost,
            product.value,
            product.imeigps
          );
        }
      });
    });
    const filteredDataArray = newDataArray.filter((item) => item !== undefined);

    setRows(filteredDataArray);
  }, [instalattion]);

  return (
    <main>
          <div style={{ maxWidth: '1650px', justifyContent: 'center', alignItems: "center", marginLeft: 30}}>
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              Listado de Sims Instalaciones
            </h6>
          </div>
        </div>
        <div className="rounded-t bg-white mb-0 px-6 py-6" style={{ gap: 30, display: 'flex'}}>
        <div>
          <h6 className="text-blueGray-700 text-xl font-bold">
            Mes Inicial
          </h6>
          <MonthSelect month={inicialMonth} setMonth={setInicialMonth} />
        </div>
        <div style={{marginLeft: 20}}>
          <h6 className="text-blueGray-700 text-xl font-bold">
            Mes Final
          </h6>
          <MonthSelect month={finalMonth} setMonth={setFinalMonth} />
        </div>
        </div>
        <div
          className="text-center flex flex-col rounded-xl"
          style={{ fontSize: 1 }}
        >
          <CollapsibleTable
            empresas={compani}
            client={client}
            fetchInstalattion={fetchInstalattion}
            instalattion={newInstallation}
            history={history}
          />
        </div>
      </div>
    </main>
  );
}
