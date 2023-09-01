

export interface DataClient {
    data: IClient[]
  }

export interface IClient {
    id: number
    attributes: client
  }
  
export interface client {
    id?: number
    email?: string
    name?: string
    fone?: number
    label?: string
}
  