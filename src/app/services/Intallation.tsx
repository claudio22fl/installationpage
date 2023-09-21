import { IRootInstallation, fotmatAttributes } from "@/types/Installation";
import { formatFecha, formatearFecha } from "@/utils/const";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const useFetchInstallation = () => {
  const [instalattion, setInstaattion] = useState<fotmatAttributes[]>([]);

  const fetchInstalattion = async () => {
    const res = await fetch(
      "https://plataformasgps.cl/api/instalattions?populate=*&sort[0]=fecha:DESC&sort[1]=hours:DESC&pagination[pageSize]=10000000000000",
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
      fecha: formatearFecha(data.attributes.fecha),
      hours: data.attributes.hours,
      installationtype: data.attributes.installationtype,
      installer: data.attributes.installer,
      address: data.attributes.address,
      vehiclename: data.attributes.vehiclename,
      patent: data.attributes.patent,
      note: data.attributes.note,
      product: data.attributes.product,
      client: data.attributes.client.data?.attributes.name,
      company: data.attributes.company.data?.attributes.name,
      commune: data.attributes.commune,
      state: data.attributes.state,
    }));
    setInstaattion(formatData);
  };

  useEffect(() => {
    fetchInstalattion();
  }, []);

  return { instalattion, fetchInstalattion };
};

export const useDeleteInstallation = (fetchInstalattion: () => void) => {
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
          const res = await fetch(
            `https://plataformasgps.cl/api/instalattions/${id}`,
            {
              method: "DELETE",
            }
          );
          if (res.ok) {
            Swal.fire("Ingresado correctamente", "", "success");
            fetchInstalattion();
          } else {
            Swal.fire("Error al ingresar", "", "error");
          }
        } catch (error) {
          console.log("Error:", error);
        }
      }
    });
    fetchInstalattion();
  };

  return { deleteInstallation };
};

export const useUpdateInstallation = (fetchInstalattion: () => void) => {
  const updateInstallation = async (id: number | undefined, data: string) => {


    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          PENDIENTE: "Pendiente",
          TRANSFERENCIA: "Transferencia",
          EFECTIVO: "Efectivo",
        });
      }, 500);
    });

    const { value: color } = await Swal.fire({
      title: "Tipos de pago",
      input: "radio",
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "Seleccione algun metodo";
        }
      },
    });

    if (color) {
      const formatData = {
        data: {
          state: color,
        },
      };
      try {
        const res = await fetch(
          `https://plataformasgps.cl/api/instalattions/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formatData),
          }
        );
        if (res.ok) {
          Swal.fire("Actualizado correctamente", "", "success");
          fetchInstalattion();
        } else {
          Swal.fire("Error al actualizar", "", "error");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }

    fetchInstalattion();
  };

  return { updateInstallation };
};
