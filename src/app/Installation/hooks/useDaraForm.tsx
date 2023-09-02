"use client";
import { fotmatAttributes } from "@/types/Installation";
import { Producto } from "@/types/Product";
import { formatDateInputs, formatHourInputs } from "@/utils/const";
import { useState } from "react";
import { create } from "zustand";

export const useDataForm = () => {
  const productoInicial: Producto[] = [];
 
  const date1 = new Date(formatDateInputs(new Date().toString()));

  date1.setMonth(date1.getMonth() + Number(1));

  const [formData, setFormData] = useState<fotmatAttributes>({
    id: 0,
    fecha: formatDateInputs(new Date().toString()),
    hours: formatHourInputs(new Date().toString()),
    installer: "",
    installationtype: "",
    address: "",
    vehiclename: "",
    patent: "",
    note: "",
    product: productoInicial,
    client: "",
    company: "",
    commune: "",
  });

  return { formData, setFormData };
};
