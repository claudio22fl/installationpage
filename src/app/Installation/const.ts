export const TABLESIMS = {
    ID: "ID",
    FECHA: "Fecha",
    EMPRESA: "Empresa",
    TIPO: "Tipo",
    DIRECCION: "Direccion",
    VEHICULO: "Vehiculo",
    PATENTE: "Patente",
    CLIENTE: "Cliente",
  } as const;


export const TABLESIMS_TD = {
    [TABLESIMS.ID]: {
      name: "ID",
      data: "id",
    },
    [TABLESIMS.EMPRESA]: {
      name: "Empresa",
      data: "empresa",
    },
    [TABLESIMS.TIPO]: {
      name: "Numero",
      data: "numero",
    },
    [TABLESIMS.DIRECCION]: {
      name: "Direccion",
      data: "direccion",
    },
    [TABLESIMS.VEHICULO]: {
      name: "Vehiculo",
      data: "vehiculo",
    },
    [TABLESIMS.PATENTE]: {
      name: "Patente",
      data: "patente",
    },
    [TABLESIMS.CLIENTE]: {
      client: "Client",
      data: "client",
    },
  } as const;
  