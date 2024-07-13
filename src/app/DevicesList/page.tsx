"use client";
import { fotmatAttributes } from "@/types/Installation";
import { useEffect, useState } from "react";
import { useFetchInstallation } from "../services/Intallation";
import { useFetchCompani } from "../services/Compani";
import { useFetchClient } from "../services/Client";
import { useFetchDevice } from "../services/Device";
import { getMonth } from "@/utils/const";
import { useSelectedMonth } from "../hooks/useSelectedMonth";
import DatePicker from "react-datepicker";
import CollapsibleTable from "./component/Table";
import style from './Installation_grafic-styles.module.css'

export default function page() {
  const [instalattionCompani, setIntalattionCompani] = useState<
    fotmatAttributes[]
  >([]);
  const [inicialDate, setInicialDate] = useState(new Date());
  const [finalDate, setFinalDate] = useState(new Date());

  const { instalattion, fetchInstalattion } = useFetchInstallation(
    inicialDate,
    finalDate
  );
  const { compani, fetchCompani } = useFetchCompani();
  const { client } = useFetchClient();

  const {device} = useFetchDevice();
  
  console.log(device)

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
          <article className={style.dateContainer}>
            <div>
              <h6 className="text-blueGray-700 text-xl font-bold">
                Dia Inicial
              </h6>
              <DatePicker
                selected={inicialDate}
                onChange={(date) => setInicialDate(date ? date : new Date())}
              />
            </div>
            <div>
              <h6 className="text-blueGray-700 text-xl font-bold">
                Dia Final
              </h6>
              <DatePicker
                selected={finalDate}
                onChange={(date) => setFinalDate(date ? date : new Date())}
              />
            </div>
          </article>
        </div>

        <div className="flex flex-col rounded-xl" style={{ fontSize: 1 }}>
          <CollapsibleTable
            empresas={rol === "admin" ? device : []}
            client={client}
            fetchInstalattion={fetchInstalattion}
            instalattion={newInstallation}
          />
        </div>
      </div>
    </main>
  );
}
