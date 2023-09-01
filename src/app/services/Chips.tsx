import { IRootEmpresa, empresa } from "@/types/Compani";
import { useEffect, useState } from "react";

export const useFetchChips= () => {
  const [chips, setChips] = useState<empresa[]>([]);

  const fetchChips = async () => {
    const res = await fetch(
      "https://plataformasgps.cl/api/chips?populate=*",
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

    const { data }: IRootEmpresa = await res.json();

    const formatData: empresa[] = data.map((data) => ({
      id: data.id,
      label: data.attributes.name
    }));

    console.log(formatData);
    setChips(formatData);
  };

  useEffect(() => {
    fetchChips();
  }, []);

  return { chips, fetchChips };
};
