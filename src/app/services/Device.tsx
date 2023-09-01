import { IRootEmpresa, empresa } from "@/types/Compani";
import { IRootProducto, Producto } from "@/types/Product";
import { useEffect, useState } from "react";

export const useFetchDevice = () => {
  const [device, setdevice] = useState<Producto[]>([]);

  const fetchDevice = async () => {
    const res = await fetch(
      "http://plataformasgps.cl:1337/api/products?populate=*",
      {
        cache: "no-store",
        mode: "cors",
      }
    );

    if (!res.ok) {
      throw new Error("problema");
    }

    const { data }: IRootProducto = await res.json();

    const formatData: Producto[] = data.map((data) => ({
      id: data.id,
      label: data.attributes.name,
      cost: data.attributes.cost,
      value: data.attributes.value,
    }));

    console.log(formatData);
    setdevice(formatData);
  };

  useEffect(() => {
    fetchDevice();
  }, []);

  return { device, fetchDevice };
};

