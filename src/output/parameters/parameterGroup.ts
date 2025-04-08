import type { Parameter } from "./parameter";

export interface ParameterGroup {
  id:              string;
  parameterType:   "instantaneous" | "accumulative";
  unit:            string;
  // valueResolution: number;
  parameters:      Parameter[];
  displayUnit?:    string;
  usesDatum?:      boolean;
}
