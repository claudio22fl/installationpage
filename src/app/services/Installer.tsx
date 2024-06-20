import { IRootChips } from "@/types/Chips";
import { instalador, Instalador, IRootInstalador } from "@/types/Installer";
import { useEffect, useState } from "react";

export const useFetchChips= () => {
    const [instalador, setInstalador] = useState<instalador[]>([]);
  
   
  
    useEffect(() => {
        fetchInstaladores();
    }, []);
  
    return { instalador, fetchInstaladores };
  };
  
  export  const fetchInstaladores = async () => {
    const res = await fetch(
      "https://plataformasgps.cl/api/installers",
      {
        cache: "no-store",
        mode: "cors",
        headers: {  
          'Content-Type': 'application/json'
        },
      }
    );

    if (!res.ok) {
      throw new Error("problema");
    }

    const { data }: IRootInstalador = await res.json();

    const formatData: string[] = data.map((item) => item.attributes.name ? item.attributes.name : "");


    console.log(formatData)

    return formatData
  };