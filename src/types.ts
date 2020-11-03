export interface TShape {
  id: number
  type: string
  colour: string
}
export interface Circle extends TShape {
  radius: number
}
export interface Polygon extends TShape {
  length: number
  height: number
}
