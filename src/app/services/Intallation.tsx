import { IRootInstallation, fotmatAttributes } from "@/types/Installation";
import { formatearFecha } from "@/utils/const";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

export const useFetchInstallation = (inicialDate?: Date, finalDate?: Date) => {
  const [instalattion, setInstaattion] = useState<fotmatAttributes[]>([]);
  const inicial = useMemo(() => {
    if (!inicialDate) {
      return null;
    }
    const adjustedInicialDate = new Date(inicialDate as Date);
    adjustedInicialDate.setDate(adjustedInicialDate.getDate());
    return adjustedInicialDate;
  }, [inicialDate]);

  const final = useMemo(() => {
    if (!finalDate) {
      return null;
    }
    const adjustedFinalDate = new Date(finalDate as Date);
    adjustedFinalDate.setDate(adjustedFinalDate.getDate());
    return adjustedFinalDate;
  }, [finalDate]);

  const fetchInstalattion = async () => {
    const baseUrl =
      "https://plataformasgps.cl/api/instalattions?populate=*&sort[0]=fecha:DESC&sort[1]=hours:DESC&pagination[pageSize]=100";
    const filterUrl =
      inicial && final
        ? `${baseUrl}&filters[fecha][$gte]=${
            inicial?.toISOString().split("T")[0]
          }&filters[fecha][$lte]=${final?.toISOString().split("T")[0]}`
        : "";

    console.log(filterUrl);
    const res = await fetch(inicial ? filterUrl : baseUrl, {
      cache: "no-store",
      mode: "cors",
    });

    if (!res.ok) {
      throw new Error("8");
    }

    const { data, meta }: IRootInstallation = await res.json();

    for (let index = 2; index <= meta.pagination.pageCount; index++) {
      const res = await fetch(
        `${inicial ? filterUrl : baseUrl}&pagination[page]=${index}`,
        {
          cache: "no-store",
          mode: "cors",
        }
      );
      if (!res.ok) {
        throw new Error("problema9");
      }
      const { data: data2 }: IRootInstallation = await res.json();
      data.push(...data2);
    }

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
      client: data.attributes.client?.data?.attributes?.name ?? null,
      company: data.attributes.company?.data?.attributes?.name ?? null,
      commune: data.attributes.commune,
      state: data.attributes.state,
    }));
    setInstaattion(formatData);
  };

  useEffect(() => {
    fetchInstalattion();
  }, [inicial, final]);

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
          PAGADO: "Pagado",
          SIN_VALOR: "Sin Valor",
        });
      }, 500);
    });

    let { value: color } = await Swal.fire({
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
      if (color === "SIN_VALOR") {
        color = "SIN VALOR";
      }
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
