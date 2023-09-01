"use client";
import Inputtype from "./Inputtype";
import SendIcon from '@mui/icons-material/Send';
import { IImpuchip, IndexPageProps, Irows } from "@/types/Types";
import { useFormCreate } from "./useFormCreate";
import "./styles.css";
import { Button } from "@mui/material";
import DenseTable, { createData } from "../tableComponent/Table";
import { useState } from "react";
import { useFetchDevice } from "@/app/services/Device";
import { useFetchCompani } from "@/app/services/Compani";
import { postClient, useFetchClient } from "@/app/services/Client";
import { client } from "@/types/Client";
import { useFetchChips } from "@/app/services/Chips";

const FormData = ({
  refreshTable,
  formData,
  setFormData,
  inputstabla,
}: IndexPageProps) => {
  const { handleChange, handleSubmit, autocompleteChague } = useFormCreate({
    refreshTable,
    formData,
    setFormData,
  });

  const { compani } = useFetchCompani();
  const { device } = useFetchDevice();
  const { client } = useFetchClient();
  const { chips } = useFetchChips();

  const [devices, setDevices] = useState({
    label: "",
    cost: "",
    value: "",
    imeigps: "",
    tipochip: "",
    numerochip: "",
  });

  const [dataUser, serDataUser] = useState<client>({
    name: "",
    email: "",
    fone: 0,
  });

  const autocompleteChagueDevice = (name: string, value: any) => {
    console.log(name);
    console.log(value);
    let parsedValue;
    parsedValue = value;

    if (typeof parsedValue === "object") {
      // value es un JSON
      for (const key in parsedValue) {
        if (Object.hasOwnProperty.call(parsedValue, key)) {
          const element = parsedValue[key];

          if (key === name) {
            const upperCaseValue = element.toUpperCase();
            setDevices({
              ...devices,
              [key]: upperCaseValue,
            });
          }
        }
      }
    } else {
      const upperCaseValue = value.toUpperCase();
      setDevices({
        ...devices,
        [name]: upperCaseValue,
      });
    }
  };
  
  const autocompleteChagueUser= (name: string, value: any) => {
    console.log(name);
    console.log(value);
    let parsedValue;
    parsedValue = value;
 

    if (typeof parsedValue === "object") {
      // value es un JSON
      for (const key in parsedValue) {
       
          const element = parsedValue[key];
          
          console.log(key);

          if (key === "nameUser" ) {
            const upperCaseValue = element.toUpperCase();
            serDataUser({
              ...dataUser,
              name: upperCaseValue,
            });
          }
          if (key === "email" ) {
            serDataUser({
              ...dataUser,
              email: element,
            });
          }
          if (key === "id" ) {
            setFormData({
              ...formData,
              ["client"]: `${element}`,
            });
          }
        
      }
    } else {
      const upperCaseValue = value.toUpperCase();
      serDataUser({
        ...dataUser,
        [name]: upperCaseValue,
      });
    }
  };

  const handleChancheDevice = (e: {
    target: { name: string; value: string };
  }) => {
    const upperCaseValue = e.target.value.toUpperCase();
    setDevices({
      ...devices,
      [e.target.name]: upperCaseValue,
    });
  };

  const handleChancheUser = (e: {
    target: { name: string; value: string };
  }) => {

    const upperCaseValue = e.target.value.toUpperCase();

    console.log(e.target.name)
    console.log(upperCaseValue)
    serDataUser({
      ...dataUser,
      [e.target.name]: upperCaseValue,
    });
  };

  const [rows, setRows] = useState<Irows[]>([]);

  const saveData = () => {
    console.log(devices);
    
     const cost = devices.cost.replace(/[,\.]/g, "");
     const value = devices.value.replace(/[,\.]/g, "");
     console.log(cost);
      console.log(value);
    const newRow = createData(
      devices.label,
      Number(cost),
      Number(value),
      devices.imeigps,
      devices.tipochip,
      devices.numerochip
    ); // Agrega aquí los valores iniciales
    console.log(newRow);

    setRows([...rows, newRow]);

    setDevices({
      label: "",
      cost: "",
      value: "",
      imeigps: "",
      tipochip: "",
      numerochip: "",
    });

    setFormData({
      ...formData,
      ["product"]: [...rows, newRow],
    });
  };

  const saveUser = async () => {
   const res = await postClient(dataUser)
   console.log(dataUser);
   
    setFormData({
      ...formData,
      ["client"]: res,
    });
    
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 style={{ color: "black" }}>Datos Instalacion</h2>
      <div className="inputs">
        <Inputtype
          inputs={inputstabla}
          handleChange={handleChange}
          formData={formData}
          autocompleteChague={autocompleteChague}
          inicio={0}
          fin={6}
          autocoleteData={compani}
        />
      </div>
      <h2 style={{ color: "black" }}>Datos vehiculo</h2>
      <div className="inputs">
        <Inputtype
          inputs={inputstabla}
          handleChange={handleChange}
          formData={formData}
          autocompleteChague={autocompleteChague}
          inicio={6}
          fin={9}
          autocoleteData={compani}
        />
      </div>
      <h2 style={{ color: "black" }}>Datos cliente</h2>
      <div className="inputs">
        <Inputtype
          inputs={inputstabla}
          handleChange={handleChancheUser}
          formData={dataUser}
          autocompleteChague={autocompleteChagueUser}
          inicio={9}
          fin={12}
          autocoleteData={client}
        />

        <Button
          sx={{ width: 25, height: 30, fontSize: 10 }}
          onClick={saveUser}
          variant="contained"
        >
          Agregar
        </Button>
      </div>

      <h2 style={{ color: "black" }}>Datos dispositivos</h2>

      <div className="inputs">
        <Inputtype
          inputs={inputstabla}
          handleChange={handleChancheDevice}
          formData={devices}
          autocompleteChague={autocompleteChagueDevice}
          inicio={12}
          fin={16}
          autocoleteData={device}
        />
         <Inputtype
          inputs={inputstabla}
          handleChange={handleChancheDevice}
          formData={devices}
          autocompleteChague={autocompleteChagueDevice}
          inicio={16}
          fin={19}
          autocoleteData={chips}
        />
        <Button 
          sx={{ width: 25, height: 30, fontSize: 10 }}
          onClick={saveData}
          variant="contained"
        >
          Agregar
        </Button>
      </div>

      <DenseTable rows={rows} />

      <div className=" mt-10 text-right">
        <Button endIcon={<SendIcon />} type="submit" variant="contained">
          Enviar
        </Button>
      </div>
    </form>
  );
};

export default FormData;
