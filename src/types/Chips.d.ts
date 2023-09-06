
export interface IRootChips{
    data: IChips[]
    meta: Meta
  }
    
  export interface IChips{
      id: number
      attributes: chips
    }
    
    export interface chips {
      id: number
      name?: string
      label?: string
      published_at?: string
      created_at?: string
      updated_at?: string
      }
    