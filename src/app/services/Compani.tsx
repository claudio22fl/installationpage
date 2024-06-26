import { IRootEmpresa, empresa } from "@/types/Compani";
import { useEffect, useState } from "react";

export const useFetchCompani = () => {
  const [compani, setCompani] = useState<empresa[]>([]);

  const fetchCompani = async () => {
    const res = await fetch(
      "https://plataformasgps.cl/api/companies?populate=*&pagination[pageSize]=10000000000000",
      {
        cache: "no-store",
        mode: "cors",
        headers: {  
          'Content-Type': 'application/json'
        },
      }
    ); 

    if (!res.ok) {
      throw new Error("problema4");
    }

    const { data }: IRootEmpresa = await res.json();

    const formatData: empresa[] = data.map((data) => ({
      id: data.id,
      label: data.attributes.name,
      percentage: data.attributes.percentage
    }));

    setCompani(formatData);
  };

  useEffect(() => {
    fetchCompani();
  }, []);

  return { compani, fetchCompani };
};
