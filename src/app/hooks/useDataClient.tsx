"use client";
import { client } from "@/types/Client";
import { fotmatAttributes } from "@/types/Installation";
import { Producto } from "@/types/Product";
import { formatDateInputs, formatHourInputs } from "@/utils/const";
import { Dispatch, useState } from "react";
import { create } from "zustand";
import { useFetchClient } from "../services/Client";


interface IState {
    setFormData: Dispatch<any>;
    formData: fotmatAttributes;
}

export const useDataClient = ({setFormData, formData}: IState) => {
  const [dataUser, serDataUser] = useState<client>({
    name: "",
    email: "",
    fone: 0,
  });
  const { client } = useFetchClient();

  const autocompleteChagueUser = (name: string, value: any) => {
  
    let parsedValue;
    parsedValue = value;

    if (typeof parsedValue === "object") {
      // value es un JSON
      for (const key in parsedValue) {
        const element = parsedValue[key];


        if (key === "nameUser") {
          const upperCaseValue = element.toUpperCase();
          serDataUser({
            ...dataUser,
            name: upperCaseValue,
          });
        }
        if (key === "email") {
          serDataUser({
            ...dataUser,
            email: element,
          });
        }
        if (key === "id") {
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

  const handleChancheUser = (e: {
    target: { name: string; value: string };
  }) => {

    const upperCaseValue = e.target.value.toUpperCase();

    serDataUser({
      ...dataUser,
      [e.target.name]: upperCaseValue,
    });
  };

  return { dataUser, serDataUser, autocompleteChagueUser, client, handleChancheUser };
};
