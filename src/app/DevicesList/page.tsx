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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import style from "./Installation_grafic-styles.module.css";
import { useFetchDevice } from "../services/Device";
import { Producto } from "@/types/Product";

export default function page() {
  const [instalattionCompani, setIntalattionCompani] = useState<
    fotmatAttributes[]
  >([]);
  const [inicialDate, setInicialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());
  const [diferentDevices, setDiferentDevices] = useState<string[]>([])

  const { instalattion, fetchInstalattion } = useFetchInstallation(
    inicialDate,
    finalDate
  );
  const { client } = useFetchClient();

  const {device} = useFetchDevice();
  
  var empresa: any = "";
  var rol: any = "";

  try {
    empresa = localStorage.getItem("empresa");
    rol = localStorage.getItem("rol");
  } catch (error) {
    empresa = "";
    rol = "";
  }
  const [inicialMonth, setInicialMonth] = useState(getMonth());
  const [finalMonth, setFinalMonth] = useState(getMonth());
  const { newInstallation } = useSelectedMonth(
    rol === "user" ? instalattionCompani : instalattion,
    inicialMonth,
    finalMonth
  );
 
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


  useEffect(() => {
    const diferentDevices = instalattion
  .flatMap(inst => inst.product.map(pro => pro.name))
  .filter((name, index, self) => self.indexOf(name) === index);

 

  setDiferentDevices(diferentDevices as string[])
    },[instalattion])

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
          <article className={style.dateContainer}>
            <div>
              <h6 className="text-blueGray-700 text-xl font-bold">
                Dia Inicial
              </h6>
              <DatePicker
                selected={inicialDate}
                onChange={(date) => setInicialDate(date ? date : new Date())}
                  dateFormat="dd-MM-yyyy"
              />
            </div>
            <div>
              <h6 className="text-blueGray-700 text-xl font-bold">
                Dia Final
              </h6>
              <DatePicker
                selected={finalDate}
                onChange={(date) => setFinalDate(date ? date : new Date())}
                  dateFormat="dd-MM-yyyy"
              />
            </div>
          </article>
        </div>

        <div className="flex flex-col rounded-xl" style={{ fontSize: 1 }}>
          <CollapsibleTable
            empresas={rol === "admin" ? diferentDevices : []}
            client={client}
            fetchInstalattion={fetchInstalattion}
            instalattion={newInstallation}
          />
        </div>
      </div>
    </main>
  );
}
