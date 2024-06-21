import { postClient } from "@/app/services/Client";
import { formatPatente } from "@/utils/const";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const useFormCreate = ({ refreshTable, formData, setFormData, defaultForm }: any) => {
  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const date1 = new Date(formData[`fechainicio`]);
    date1.setMonth(date1.getMonth() + Number(e.target.value));

    if (e.target.name === "installer") {
      const upperCaseValue = e.target.value.toUpperCase();
      let installer = formData["installer"];

      if (!installer.includes(upperCaseValue)) {
        installer += (installer.length > 0 ? "," : "") + upperCaseValue;
      } else {
        // Si upperCaseValue ya está en installer, quitarlo
        installer = installer
          .split(",")
          .filter((item: any) => item !== upperCaseValue)
          .join(",");
      }

      setFormData({
        ...formData,
        [e.target.name]: installer,
      });
    } else if (e.target.name === "patent") {
      const patente = formatPatente(e.target.value);
      const upperCaseValue = patente.toUpperCase();
      setFormData({
        ...formData,
        [e.target.name]: upperCaseValue,
      });
    } else if (e.target.name === "hours") {
      setFormData({
        ...formData,
        [e.target.name]: `${e.target.value}:00`,
      });
    } else {
      const upperCaseValue = e.target.value.toUpperCase();
      setFormData({
        ...formData,
        [e.target.name]: upperCaseValue,
      });
    }
  };

  const autocompleteChague = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const formatData = {
      data: {
        ...formData,
      },
    };

    try {
      const response = await fetch(
        "https://plataformasgps.cl/api/instalattions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formatData),
        }
      );

      if (response.ok) {
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Agregado correctamente",
        });
        defaultForm();
        refreshTable();
      } else {
        Swal.fire("Error al ingresar", "", "error");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleEdit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setFormData({
      ...formData,
      ["installer"]: formData.installer.split(","),
    });

    const formatData = {
      data: {
        ...formData,
      },
    };
    try {
      const response = await fetch(
        `https://plataformasgps.cl/api/instalattions/${formData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formatData),
        }
      );

      if (response.ok) {
        const Toast = Swal.mixin({
          toast: true,
          position: "center",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Actualizado correctamente",
        });

        refreshTable();
      } else {
        Swal.fire("Error al ingresar", "", "error");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    autocompleteChague,
    handleEdit,
  };
};
