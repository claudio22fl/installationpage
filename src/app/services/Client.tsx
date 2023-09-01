import { DataClient, IClient, client } from "@/types/Client";
import { IRootEmpresa, empresa } from "@/types/Compani";
import { useEffect, useState } from "react";

export const useFetchClient = () => {
  const [client, setClient] = useState<client[]>([]);

  const fetchClient = async () => {
    const res = await fetch(
      "http://plataformasgps.cl:1337/api/clients?populate=*",
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
      email: data.attributes.email
    }));

    console.log(formatData);
    setClient(formatData);
  };

  useEffect(() => {
    fetchClient();
  }, []);

  return { client, fetchClient };
};

export const postClient = async (dataUser: client) => {
    const newClient = {
      "data": {
        ...dataUser
      }
    };
  
    const res = await fetch("http://plataformasgps.cl:1337/api/clients", {
      method: "POST",
      mode: 'cors',
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClient),
    });
  
    if (!res.ok) {
      throw new Error("problema");
    }
  
    const responseData = await res.json();
    const { id } = responseData.data;
   
    console.log(responseData.data.id);
  
    return `${id}`;
  };
  
  