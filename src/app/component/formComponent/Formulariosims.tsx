"use client";
import Inputtype from "./Inputtype";
import SendIcon from "@mui/icons-material/Send";
import { IImpuchip, IndexPageProps, Irows } from "@/types/Types";
import { useFormCreate } from "./useFormCreate";
import "./styles.css";
import { Button } from "@mui/material";
import DenseTable, { createData } from "../tableComponent/Table";
import { useEffect, useState } from "react";
import { useFetchCompani } from "@/app/services/Compani";
import { postClient, useFetchClient } from "@/app/services/Client";
import { useFetchChips } from "@/app/services/Chips";
import { useDataClient } from "@/app/hooks/useDataClient";
import { useDataDevice } from "@/app/hooks/useDataDevice";

const FormData = ({
  refreshTable,
  formData,
  setFormData,
  inputstabla,
  isUpdate,
}: IndexPageProps) => {

  const { handleChange, handleSubmit, autocompleteChague, handleEdit } = useFormCreate({
    refreshTable,
    formData,
    setFormData,
  });

  const { compani } = useFetchCompani();
  const { chips } = useFetchChips();

  

  const {
    dataUser,
    serDataUser,
    autocompleteChagueUser,
    client,
    handleChancheUser,
  } = useDataClient({ setFormData, formData });
  const {
    devices,
    device,
    setDevices,
    autocompleteChagueDevice,
    handleChancheDevice,
  } = useDataDevice();

  useEffect(() => {
    if(formData.client !== 0){
      console.log(formData.client);
      console.log(client);
      client?.forEach((element) => {
         if(element.label === formData.client){
           serDataUser({
             ...dataUser,
             name: element.label,
             email: element.email,
             fone: element.fone,
           });

           setFormData({
              ...formData,
              ["client"]: element.id,
           })
         }
      })
    }
 }, [client]);

  useEffect(() => {
   if(formData.company !== ""){
     compani?.forEach((element) => {
        if(element.label === formData.company){
          setFormData({
             ...formData,
             ["company"]:{"id":element.id,"label": element.label},
          })
        }
     })
   }
} , [compani]);

  const [rows, setRows] = useState<Irows[]>(formData.product);

  const saveData = () => {
    const cost = devices.cost.replace(/[,\.]/g, "");
    const value = devices.value.replace(/[,\.]/g, "");
    const newRow = createData(
      devices.label,
      Number(cost),
      Number(value),
      devices.imeigps,
      devices.tipochip,
      devices.numerochip
    ); // Agrega aquí los valores iniciales

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
    const res = await postClient(dataUser);

    setFormData({
      ...formData,
      ["client"]: res,
    });
  };


  return (
   <form onSubmit={ isUpdate ? handleEdit : handleSubmit} className="form">
      <h2 style={{ color: "black" }}>Datos Instalacion</h2>
      <div className="inputs">
        <Inputtype
          inputs={inputstabla}
          handleChange={handleChange}
          formData={formData}
          autocompleteChague={autocompleteChague}
          inicio={0}
          fin={7}
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
          inicio={7}
          fin={10}
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
          inicio={10}
          fin={13}
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
          inicio={13}
          fin={17}
          autocoleteData={device}
        />
        <Inputtype
          inputs={inputstabla}
          handleChange={handleChancheDevice}
          formData={devices}
          autocompleteChague={autocompleteChagueDevice}
          inicio={17}
          fin={20}
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

      <DenseTable rows={rows} setRows={setRows}/>

      <div className=" mt-10 text-right">
        <Button endIcon={<SendIcon />} type="submit" variant="contained">
          Enviar
        </Button>
      </div>
    </form>
  );
};

export default FormData;
