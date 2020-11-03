export interface TShape {
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
