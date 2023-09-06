import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import { fotmatAttributes } from "@/types/Installation";
import { useDataForm } from "@/app/Installation/hooks/useDaraForm";
import FormData from "@/app/component/formComponent/Formulariosims";
import { inputstabla } from "@/app/hooks/mockInputs";
import "../../Installation/styles.css";
import { useEffect } from "react";
import { formatearFecha } from "@/utils/const";
import { client } from "@/types/Client";

interface IModalUpdate {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  row: fotmatAttributes;
  client: client[];
  fetchInstalattion: () => void;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

export default function ModalUpdate({
  open,
  setOpen,
  row,
  client,
  fetchInstalattion,
}: IModalUpdate) {
  const { formData, setFormData } = useDataForm();

  const idCliente = client?.find((element) => element.label === row.client)?.id;

  useEffect(() => {
    setFormData({
      ["id"]: row.id,
      ["fecha"]: formatearFecha(row.fecha),
      ["hours"]: row.hours,
      ["installer"]: row.installer,
      ["installationtype"]: row.installationtype,
      ["address"]: row.address,
      ["vehiclename"]: row.vehiclename,
      ["patent"]: row.patent,
      ["note"]: row.note,
      ["product"]: row.product,
      ["client"]: `${idCliente}`,
      ["company"]: row.company,
      ["commune"]: row.commune,
    });
  }, [row]);

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog
        disableEscapeKeyDown
        open={open}
        maxWidth={"xl"}
        fullWidth={true}
        onClose={handleClose}
      >
        <DialogTitle>Actualizar instalacion</DialogTitle>
        <DialogContent>
          <div className="flex-auto px-4 bg-gray-300 lg:px-10  pt-0 rounded-b-xl">
            <FormData
              refreshTable={fetchInstalattion}
              formData={formData}
              setFormData={setFormData}
              inputstabla={inputstabla}
              isUpdate={true}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
