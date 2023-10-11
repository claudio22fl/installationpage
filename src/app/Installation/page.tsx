"use client";
import React, { useEffect } from "react";
import styles from "../page.module.css";
import FormData from "../component/formComponent/Formulariosims";
import { useDataForm } from "./hooks/useDaraForm";
import { inputstabla } from "../hooks/mockInputs";
import { useFetchInstallation } from "../services/Intallation";
import './styles.css'
import { Container, Divider } from "@mui/material";

export default function Page() {
  const { instalattion, fetchInstalattion } = useFetchInstallation();
  const { formData, setFormData } = useDataForm();

  return (
    <main  style={{ width: '105%', marginLeft: '40px', marginTop: "50px", gap: "10"}}> 
         <div className="flex-auto px-4 bg-gray-300 lg:px-10  pt-0 rounded-b-xl">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Agregar Instalacion</h6>
            <button onClick={() => {}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                color="red"
                fill="currentColor"
                className="bi bi-trash3-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
              </svg>
            </button>
          </div>
        </div>
        <Divider />
        <div className="flex-auto px-4 bg-gray-300 lg:px-10  pt-0 rounded-b-xl" >
          <FormData
            refreshTable={fetchInstalattion}
            formData={formData}
            setFormData={setFormData}
            inputstabla={inputstabla}
            isUpdate={false}
          />
        </div>
      
    </main>
  );
}
