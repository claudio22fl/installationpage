"use client";
import React, { useEffect } from "react";
import styles from "../page.module.css";
import { useFetchInstallation } from "../services/Intallation";
import { Container } from "@mui/material";
import { useDataForm } from "../Installation/hooks/useDaraForm";
import '../Installation/styles.css'
import { useFetchClient } from "../services/Client";
import CollapsibleTable from "./component/Table";

export default function Page() {
  const { instalattion, fetchInstalattion } = useFetchInstallation();
  const { formData, setFormData } = useDataForm();
  const { client } = useFetchClient();

  return (
    <main>
      <div style={{ maxWidth: '1650px'}}>
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Listado de Instalacion</h6>
          </div>
        </div>
       
          <div className="text-center flex flex-col rounded-xl" style={{fontSize: 1}}>
            <CollapsibleTable instalattion={instalattion} client = {client} fetchInstalattion={fetchInstalattion} />
          </div>
       
      </div>
    </main>
  );
}
