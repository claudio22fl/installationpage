"use client";
import React, { useEffect } from "react";
import styles from "../page.module.css";
import { useFetchInstallation } from "../services/Intallation";
import { Container } from "@mui/material";
import { useDataForm } from "../Installation/hooks/useDaraForm";
import CollapsibleTable from "../Installation/component/Table";
import '../Installation/styles.css'
export default function Page() {
  const { instalattion, fetchInstalattion } = useFetchInstallation();
  const { formData, setFormData } = useDataForm();

  return (
    <main className={styles.main}>
      <Container fixed maxWidth="xl">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Listado de Instalacion</h6>
          </div>
        </div>
       
          <div className="text-center flex flex-col rounded-xl">
            <CollapsibleTable instalattion={instalattion} />
          </div>
       
      </Container>
    </main>
  );
}
