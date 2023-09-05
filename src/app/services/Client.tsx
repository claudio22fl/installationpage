import { DataClient, IClient, client } from "@/types/Client";
import { IRootEmpresa, empresa } from "@/types/Compani";
import { format } from "path";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const useFetchClient = () => {
  const [client, setClient] = useState<client[]>([]);

  const fetchClient = async () => {
    const res = await fetch(
      "https://plataformasgps.cl/api/clients?populate=*",
      {
        cache: "no-store",
        mode: "cors",
      }
    );

    if (!res.ok) {
      throw new Error("problema");
    }

    const { data }: DataClient = await res.json();

    const formatData: client[] = data.map((data) => ({
      id: data.id,
      label: data.attributes.name,
      nameUser: data.attributes.name,
      fone: data.attributes.fone,
      email: data.attributes.email,
    }));

    setClient(formatData);
  };

  useEffect(() => {
    fetchClient();
  }, []);

  return { client, fetchClient };
};

export const postClient = async (dataUser: client) => {
  const formatDataUser = () => {
    if (dataUser.email === "" || dataUser.email === null) {
      return {
        name: dataUser.name,
        fone: dataUser.fone,
      };
    } else {
      return {
        name: dataUser.name,
        fone: (dataUser.fone),
        email: dataUser.email,
      };
    }
  };
  const newClient = {
    data: {
      ...formatDataUser(),
    },
  };
  console.log(JSON.stringify(newClient));
  const res = await fetch("https://plataformasgps.cl/api/clients", {
    method: "POST",
    mode: "cors",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newClient),
  });

  if (!res.ok) {
    const responseData = await res.json();
     const { message } = responseData.error;
   console.log(message);
   if(message === "This attribute must be unique"){
    Swal.fire({
      title: `El usuario ${dataUser.name} ya existe`,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
   }else{
    Swal.fire({
      title: `Error al agregar cliente`,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
   }
  } else {
    Swal.fire({
      title: "Cliente agregado correctamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  }

  const responseData = await res.json();
  const { id } = responseData.data;

  return `${id}`;
};
