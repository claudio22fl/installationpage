import { DataClient, IClient } from "./Client"
import { DataEmpresa, IEmpresa } from "./Compani"
import { Instalador } from "./Installer"
import { Producto } from "./Product"

export interface IRootInstallation {
  data: Idata[]
  meta: Meta
}

export interface Idata {
  id: number
  attributes: Attributes
}

export interface Attributes {
  fecha: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  installationtype: string
  address: string
  vehiclename: string
  patent: string
  note: string
  product: Producto[]
  client: string
  company: DataClient
  hours: string
}

export interface fotmatAttributes {
  id?: number
  fecha: string
  installer: string
  hours: string
  installationtype: string
  address: string
  vehiclename: string
  patent: string
  note: string
  product: Producto[]
  client: string
  company: string
  commune: string
}