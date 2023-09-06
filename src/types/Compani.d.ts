
export interface IRootEmpresa {
  data: IEmpresa[]
  meta: Meta
}
  
export interface IEmpresa {
    id: number
    attributes: empresa
  }
  
  export interface empresa {
    id: number
    name?: string
    label?: string
    published_at?: string
    created_at?: string
    updated_at?: string
    percentage?: number
    }
  