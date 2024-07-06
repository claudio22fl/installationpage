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
    fone: 0,
    email: "",
  });
  const { client , fetchClient } = useFetchClient();

  const autocompleteChagueUser = (name: string, value: any) => {

    if (typeof value === "object") {
      // value es un JSON
      const name = value.nameUser;
      const email = value.email;
  
      serDataUser({
        ...dataUser,
        ["name"]: name,
        ["fone"]: value.fone ? value.fone : 0,
        ["email"]: email,
      });
      
      setFormData({
        ...formData,
        ["client"]: `${value.id}`,
      })

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

  return { dataUser, serDataUser, autocompleteChagueUser, client, handleChancheUser, fetchClient };
};
