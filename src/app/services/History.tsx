import { DataHistory, IHistory, history } from "@/types/History";
import { IRootEmpresa, empresa } from "@/types/Compani";
import { format } from "path";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { formatDateInputs, formatearFecha } from "@/utils/const";

export const useFetchHistory = (id : number) => {
  const [history, setHistory] = useState<history[]>([]);
  const fetchHistory = async () => {
    const res = await fetch(
      `https://plataformasgps.cl/api/histories?filters[idinstalattion]=${id}&pagination[pageSize]=10000000000000`,
      {
        cache: "no-store",
        mode: "cors",
      }
    );
    if (!res.ok) {
      throw new Error("problema5");
    }

    const { data }: DataHistory = await res.json();

    const formatData: history[] = data.map((data) => ({
       id: data.id,
       idinstalattion: data.attributes.idinstalattion,
       months: data.attributes.months,
       renewal: data.attributes.renewal,
    }));

    setHistory(formatData);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return { history, fetchHistory };
};

export const useFetchHistoryAll = () => {
  const [history, setHistory] = useState<history[]>([]);
  const fetchHistory = async () => {
    const res = await fetch(
      `https://plataformasgps.cl/api/histories?pagination[pageSize]=10000000000000`,
      {
        cache: "no-store",
        mode: "cors",
      }
    );
    if (!res.ok) {
      throw new Error("problema6");
    }

    const { data }: DataHistory = await res.json();

    const formatData: history[] = data.map((data) => ({
       id: data.id,
       idinstalattion: data.attributes.idinstalattion,
       months: data.attributes.months,
       renewal: data.attributes.renewal,
    }));

    setHistory(formatData);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return { history, fetchHistory };
}

export const postHistory = async (dataUser: history) => {
  
  const newHistory = {
    data: {
       "months": String(dataUser.months),
       "renewal": formatearFecha(dataUser.renewal),
       "idinstalattion": dataUser.idinstalattion,
    },
  };
  const res = await fetch("https://plataformasgps.cl/api/histories", {
    method: "POST",
    mode: "cors",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newHistory),
  });

  if (!res.ok) {
    const responseData = await res.json();
     const { message } = responseData.error;
   
    Swal.fire({
      title: `Error al agregar cliente`,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
   
  } else {
    Swal.fire({
      title: "Historye agregado correctamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  }

};
