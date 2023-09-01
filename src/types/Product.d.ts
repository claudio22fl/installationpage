


export interface IRootProducto {
  data: IProducto[]
  meta: Meta
}
  
export interface IProducto {
    id: number
    attributes: Producto
  }


export interface Producto {
    name?: string
    value?: number
    cost?: number
    label?: string
    imeigps?: string,
    tipochip?: string,
    numerochip?: string
  }