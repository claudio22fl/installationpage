import { IRootInstallation, fotmatAttributes } from "@/types/Installation";
import { formatFecha } from "@/utils/const";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const useFetchInstallation = () => {
  const [instalattion, setInstaattion] = useState<fotmatAttributes[]>([]);

  const fetchInstalattion = async () => {
    const res = await fetch(
      "https://plataformasgps.cl/api/instalattions?populate=*",
      {
        cache: "no-store",
        mode: "cors",
      }
    );
    if (!res.ok) {
      throw new Error("problema");
    }

    const { data }: any = await res.json();

    const formatData: fotmatAttributes[] = data.map((data: any) => ({
      id: data.id,
      fecha: formatFecha(data.attributes.fecha),
      hora: data.attributes.hours,
      installationtype: data.attributes.installationtype,
      address: data.attributes.address,
      vehiclename: data.attributes.vehiclename,
      patent: data.attributes.patent,
      note: data.attributes.note,
      product: data.attributes.product,
      client: data.attributes.client.data?.attributes.name,
      company: data.attributes.company.data?.attributes.name,
    }));

    console.log(formatData);
    setInstaattion(formatData);
  };

  useEffect(() => {
    fetchInstalattion();
  },[]);

  return { instalattion, fetchInstalattion };
};

export const useDeleteInstallation = () => {
  const { fetchInstalattion: refreshTable } = useFetchInstallation();

  const deleteInstallation = async (id: number | undefined) => {

    Swal.fire({
      title: "Esta seguro?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!",
      cancelButtonText: "cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`https://plataformasgps.cl/api/instalattions/${id}`, {
            method: "DELETE",
          });
          if (res.ok) {
            Swal.fire("Ingresado correctamente", "", "success");
            refreshTable();
          } else {
            Swal.fire("Error al ingresar", "", "error");
          }
        } catch (error) {
          console.log("Error:", error);
        }
      }
    });
    refreshTable();
  };

  return { deleteInstallation };
}