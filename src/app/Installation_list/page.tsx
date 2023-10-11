"use client";
import React, { useEffect, useState } from "react";
import { useFetchInstallation } from "../services/Intallation";
import "../Installation/styles.css";
import { useFetchClient } from "../services/Client";
import CollapsibleTable from "./component/Table";
import MonthSelect from "../component/MonthSelect";
import { getMonth } from "@/utils/const";
import { useSelectedMonth } from "../hooks/useSelectedMonth";
import { fotmatAttributes } from "@/types/Installation";

export default function Page() {
  const { instalattion, fetchInstalattion } = useFetchInstallation();
  const [instalattionCompani, setIntalattionCompani] = useState<
    fotmatAttributes[]
  >([]);
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
  console.log(rol);
  const { newInstallation } = useSelectedMonth(
    rol === "user" ? instalattionCompani : instalattion,
    inicialMonth,
    finalMonth
  );

  useEffect(() => {
    console.log(empresa);
    if (empresa) {
      //filtrar por empresa
      const installationsCompany = instalattion.filter((installation: any) => {
        console.log(installation.company, empresa);
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
            <h6 className="text-blueGray-700 text-xl font-bold">
              Listado de Instalacion
            </h6>
          </div>
        </div>

        <div
          className="rounded-t bg-white mb-0 px-6 py-6"
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

        <div
          className="text-center flex flex-col rounded-xl"
          style={{ fontSize: 1 }}
        >
          <CollapsibleTable
            instalattion={newInstallation}
            client={client}
            fetchInstalattion={fetchInstalattion}
          />
        </div>
      </div>
    </main>
  );
}
