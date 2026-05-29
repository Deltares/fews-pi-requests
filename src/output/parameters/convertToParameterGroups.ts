import type { TimeSeriesParametersResponse } from '../../response/timeseriesparameters/timeSeriesParametersResponse'
import type { ParameterGroupsOutput } from './parameterGroupsOutput'
import type { Parameter } from './parameter'
import type { ParameterGroup } from './parameterGroup'

/**
 * Checks if the provided value is of type Parameter.
 *
 * @param parameter - The value to be checked.
 * @returns True if the value is of type Parameter, false otherwise.
 */
function isParameter(parameter: Parameter | unknown): parameter is Parameter { // NOSONAR(S6571) - Unknown type in type guard is recommended 
  return (parameter as Parameter).name !== undefined
}

function toParameter(parameter: Parameter | unknown): Parameter | undefined { // NOSONAR(S6571) - Unknown type in type guard is recommended 
  if (!isParameter(parameter)) return undefined
  return {
    id: parameter.id,
    name: parameter.name,
    shortName: parameter.shortName,
  }
}

function createParameterGroup(
  groupId: string,
  tsParameter: TimeSeriesParametersResponse['timeSeriesParameters'][number],
): ParameterGroup {
  const parameterGroup: ParameterGroup = {
    id: groupId,
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
  return parameterGroup
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
  const groupsById = new Map<string, ParameterGroup>()
  const result: ParameterGroupsOutput = {
    parameters: [],
  }

  for (const tsParameter of response.timeSeriesParameters) {
    const parameterGroupId = tsParameter.parameterGroup
    const parameter = toParameter(tsParameter)

    if (parameterGroupId === undefined) {
      if (parameter !== undefined) result.parameters.push(parameter)
      continue
    }

    let group = groupsById.get(parameterGroupId)
    if (group === undefined) {
      group = createParameterGroup(parameterGroupId, tsParameter)
      groupsById.set(parameterGroupId, group)
      result.parameters.push(group)
    }

    if (parameter !== undefined) {
      group.parameters.push(parameter)
    }
  }

  return result
}

