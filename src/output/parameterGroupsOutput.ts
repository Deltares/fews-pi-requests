import type { TimeSeriesParameter, TimeSeriesParametersResponse } from "@/response/timeseriesparameters/timeSeriesParametersResponse";
import { TimeSeriesType } from "..";

export type ParameterOutputType= "raw" | "parameterGroups"

export interface ParameterGroupsOutput {
    parameters: (ParameterGroup|Parameter)[];
}

export interface ParameterGroup {
    id:              string;
    parameterType:   "instantaneous" | "accumulative";
    unit:            string;
    // valueResolution: number;
    parameters:      Parameter[];
    displayUnit?:    string;
    usesDatum?:      boolean;
}

export interface Parameter {
    id:        string;
    name:      string;
    shortName: string;
}

export interface ParameterOutputOptions {
  type: ParameterOutputType;
}

export interface ParameterGroupsOutputOptions extends ParameterOutputOptions {
  type: "parameterGroups";
}

function isParameter(parameter: Parameter | any): parameter is Parameter {
  return (parameter as Parameter).name !== undefined
}

function isParameterGroup(parameter: ParameterGroup | any): parameter is ParameterGroup {
  return (parameter as ParameterGroup).parameters !== undefined
}

export function convertToParameterGroups(response: TimeSeriesParametersResponse): ParameterGroupsOutput {
  const groupIds: string[] = []
  const result: ParameterGroupsOutput = {
    parameters: []
  }
  for ( const tsParameter of response.timeSeriesParameters) {
    const parameterGroupId = tsParameter.parameterGroup
    if (parameterGroupId !== undefined && groupIds.includes(parameterGroupId)) {
      const group = result.parameters.find( g => "parameters" in g && g.id === parameterGroupId )
      if ( isParameterGroup(group) && isParameter(tsParameter)) {
        const parameter: Parameter = {
          id: tsParameter.id,
          name: tsParameter.name,
          shortName: tsParameter.shortName
        }
        group.parameters.push(parameter)
      }
    } else if(parameterGroupId !== undefined) {
      groupIds.push(parameterGroupId)
      const parameterGroup: ParameterGroup = { 
        id: parameterGroupId,
        parameterType: tsParameter.parameterType === "instantaneous" ? "instantaneous" : "accumulative",
        unit: tsParameter.unit ?? '',
        parameters: []
      }
      if ( tsParameter.displayUnit !== tsParameter.unit) parameterGroup.displayUnit = tsParameter.displayUnit
      if ( tsParameter.usesDatum === "true") parameterGroup.usesDatum = true
      if (isParameter(tsParameter)) {
        const parameter: Parameter = {
          id: tsParameter.id,
          name: tsParameter.name,
          shortName: tsParameter.shortName
        }
        parameterGroup.parameters.push(parameter)
      }
      result.parameters.push(parameterGroup)
    } else if (isParameter(tsParameter)) {
      const parameter: Parameter = {
        id: tsParameter.id,
        name: tsParameter.name,
        shortName: tsParameter.shortName
      }
      result.parameters.push(parameter)
    }
  }
  return result
}