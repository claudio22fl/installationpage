export interface IImpuchip {
    id: number;
    name: string;
    label: string;
    tipo: string;
    valor: string[];
    shrink: boolean;
  }

  export interface IInputsTypeProps {
    inputs: IImpuchip[]
    handleChange: (e: {
      target: {
        name: any;
        value: any;
      };
    }) => void;
    formData: IFormData;
    autocompleteChague: (name: string, value: string) => void;
    inicio: number;
    fin: number;
    autocoleteData: any;
  }
  

  export interface Irows {
    name: string;
    cost: number;
    value: number;
    imeigps: string;
    tipochip: string;
    numerochip: string;
}


export type IndexPageProps = {
  refreshTable: () => void;
  formData: fotmatAttributes;
  setFormData: React.Dispatch<React.SetStateAction<fotmatAttributes>>;
  inputstabla: IImpuchip[];
  isUpdate: boolean;
};

export type formatRow = {
  compani: string,
  fehchaInsta: string,
  id: number | undefined,
  producto: string | undefined,
  cost: number | undefined,
  value: number | undefined,
  imeiGps: string | undefined
}