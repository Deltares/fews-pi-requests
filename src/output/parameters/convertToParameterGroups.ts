import type { TimeSeriesParametersResponse } from '../../response/timeseriesparameters/timeSeriesParametersResponse'
import type { ParameterGroupsOutput } from './parameterGroupsOutput'
import type { Parameter } from './parameter'
import type { ParameterGroup } from './parameterGroup'

/**
 * Checks if the provided value is of type Parameter.
 *
 * @param {Parameter | any} parameter - The value to be checked.
 * @returns {boolean} True if the value is of type Parameter, false otherwise.
 */
function isParameter(parameter: Parameter | unknown): parameter is Parameter {
  return (parameter as Parameter).name !== undefined
}

/**
 * Checks if the provided value is of type ParameterGroup.
 *
 * @param {ParameterGroup | any} parameter - The value to be checked.
 * @returns {boolean} True if the value is of type ParameterGroup, false otherwise.
 */
function isParameterGroup(
  parameter: ParameterGroup | unknown,
): parameter is ParameterGroup {
  return (parameter as ParameterGroup).parameters !== undefined
}

/**
 * Converts the response from a TimeSeriesParameters API call to the ParameterGroupsOutput format.
 *
 * @param {TimeSeriesParametersResponse} response - The response from the TimeSeriesParameters API call.
 * @returns {ParameterGroupsOutput} The converted output in the ParameterGroupsOutput format.
 */
export function convertToParameterGroups(
  response: TimeSeriesParametersResponse,
): ParameterGroupsOutput {
  const groupIds: string[] = []
  const result: ParameterGroupsOutput = {
    parameters: [],
  }
  for (const tsParameter of response.timeSeriesParameters) {
    const parameterGroupId = tsParameter.parameterGroup
    if (parameterGroupId !== undefined && groupIds.includes(parameterGroupId)) {
      const group = result.parameters.find(
        (g) => 'parameters' in g && g.id === parameterGroupId,
      )
      if (isParameterGroup(group) && isParameter(tsParameter)) {
        const parameter: Parameter = {
          id: tsParameter.id,
          name: tsParameter.name,
          shortName: tsParameter.shortName,
        }
        group.parameters.push(parameter)
      }
    } else if (parameterGroupId !== undefined) {
      groupIds.push(parameterGroupId)
      const parameterGroup: ParameterGroup = {
        id: parameterGroupId,
        parameterType:
          tsParameter.parameterType === 'instantaneous'
            ? 'instantaneous'
            : 'accumulative',
        unit: tsParameter.unit ?? '',
        parameters: [],
      }
      if (tsParameter.displayUnit !== tsParameter.unit)
        parameterGroup.displayUnit = tsParameter.displayUnit
      if (tsParameter.usesDatum === 'true') parameterGroup.usesDatum = true
      if (isParameter(tsParameter)) {
        const parameter: Parameter = {
          id: tsParameter.id,
          name: tsParameter.name,
          shortName: tsParameter.shortName,
        }
        parameterGroup.parameters.push(parameter)
      }
      result.parameters.push(parameterGroup)
    } else if (isParameter(tsParameter)) {
      const parameter: Parameter = {
        id: tsParameter.id,
        name: tsParameter.name,
        shortName: tsParameter.shortName,
      }
      result.parameters.push(parameter)
    }
  }
  return result
}
