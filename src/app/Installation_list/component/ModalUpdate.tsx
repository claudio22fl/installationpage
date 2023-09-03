import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { fotmatAttributes } from "@/types/Installation";
import { useFetchInstallation } from "@/app/services/Intallation";
import { useDataForm } from "@/app/Installation/hooks/useDaraForm";
import FormData from "@/app/component/formComponent/Formulariosims";
import { inputstabla } from "@/app/hooks/mockInputs";
import '../../Installation/styles.css'
import { useEffect } from "react";
import { formatDateInputs, formatHourInputs } from "@/utils/const";

interface IModalUpdate {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  row: fotmatAttributes;
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

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function ModalUpdate({ open, setOpen, row }: IModalUpdate) {
  const [age, setAge] = React.useState<number | string>("");
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const { instalattion, fetchInstalattion } = useFetchInstallation();
  const { formData, setFormData } = useDataForm();
  
  console.log(row.installer)

    useEffect(() => {
    setFormData({
        ["id"]: row.id,
        ["fecha"]: formatDateInputs(row.fecha),
        ["hours"]: (row.hours),
        ["installer"]: row.installer,
        ["installationtype"]: row.installationtype,
        ["address"]: row.address,
        ["vehiclename"]: row.vehiclename,
        ["patent"]: row.patent,
        ["note"]: row.note,
        ["product"]: row.product,
        ["client"]: row.client,
        ["company"]: row.company,
        ["commune"]: row.commune,
      
    });
   }, [row])  

  const handleChangeAcordeon =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    setAge(Number(event.target.value) || "");
  };

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
      <Dialog disableEscapeKeyDown open={open}  maxWidth={'xl'} fullWidth={true} onClose={handleClose}>
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
