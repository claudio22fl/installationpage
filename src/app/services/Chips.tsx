import { IRootChips, chips } from "@/types/Chips";
import { useEffect, useState } from "react";

export const useFetchChips= () => {
  const [chips, setChips] = useState<chips[]>([]);

  const fetchChips = async () => {
    const res = await fetch(
      "https://plataformasgps.cl/api/chips?populate=*&pagination[pageSize]=100000",
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

    const { data }: IRootChips = await res.json();

    const formatData: chips[] = data.map((data) => ({
      id: data.id,
      label: data.attributes.name
    }));

    setChips(formatData);
  };

  useEffect(() => {
    fetchChips();
  }, []);

  return { chips, fetchChips };
};
