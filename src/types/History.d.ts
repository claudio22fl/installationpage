

export interface DataHistory {
    data: IHistory[]
  }

export interface IHistory {
    id: number
    attributes: history
  }
  
export interface history {
    id?: number
    idinstalattion?: number
    renewal: string
    months?: string
    
}
  