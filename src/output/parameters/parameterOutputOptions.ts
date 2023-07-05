import type { ParameterOutputType } from "./parameterOutputType";

export interface ParameterOutputOptions {
  type: ParameterOutputType;
}

export interface ParameterGroupsOutputOptions extends ParameterOutputOptions {
  type: "parameterGroups";
}
