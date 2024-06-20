export interface Instalador {
  id: number;
  nombre: string;
}

export interface IRootInstalador {
  data: IInstalador[];
  meta: Meta;
}

export interface IInstalador {
  id: number;
  attributes: instalador;
}

export interface instalador {
  name?: string;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}
