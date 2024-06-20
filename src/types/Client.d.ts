

export interface DataClient {
    data: IClient[]
    meta: Meta
  }

export interface IClient {
    id: number
    attributes: client
  }
  
export interface client {
    id?: number
    email?: string
    name?: string
    fone?: number | string
    label?: string
}
  