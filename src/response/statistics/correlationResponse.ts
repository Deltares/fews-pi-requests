/* tslint:disable */

/**
 * CorrelationResponse PI_JSON
 */
export interface CorrelationResponse {
  equation?: Equation
  title?: string
  xAxis?: Axis
  yAxis?: Axis
  values?: Value[]
  fitPoints?: FitPoint[]
}
export interface Equation {
  description: string
  type: string
  coefficientA: number
  coefficientB: number
  rSquared: number
  status: "nominal" | "coefficients-invalid" | "curve-invalid" | "input-too-short"
  statusDescription: string
  requiredPointCount: number
}
export interface Axis {
  label: string
}
export interface Value {
  time: string
  x: number
  y: number
}
export interface FitPoint {
  x: number
  y: number
}
