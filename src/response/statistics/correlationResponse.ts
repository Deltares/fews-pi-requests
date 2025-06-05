/* tslint:disable */

/**
 * CorrelationResponse PI_JSON
 */
export interface CorrelationResponse {
  equation?: Equation;
  title?: string;
  xAxis?: Axis;
  yAxis?: Axis;
  values?: Value[];
  fitPoints?: FitPoint[];
}
export interface Equation {
  description: string;
  "R-squared": number;
}
export interface Axis {
  label: string;
}
export interface Value {
  time: string;
  x: number;
  y: number;
}
export interface FitPoint {
  x: number;
  y: number;
}
