import type { Parameter } from "./parameter";
import type { ParameterGroup } from "./parameterGroup";

export interface ParameterGroupsOutput {
    parameters: (ParameterGroup|Parameter)[];
}


