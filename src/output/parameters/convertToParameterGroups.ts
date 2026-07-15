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
function isParameter(parameter: Parameter | unknown): parameter is Parameter { // NOSONAR(S6571) - Unknown type in type guard is recommended
  return (parameter as Parameter).name !== undefined
}

/**
 * Checks if the provided value is of type ParameterGroup.
 *
 * @param {ParameterGroup | any} parameter - The value to be checked.
 * @returns {boolean} True if the value is of type ParameterGroup, false otherwise.
 */
function isParameterGroup(
  parameter: ParameterGroup | unknown, // NOSONAR(S6571) - Unknown type in type guard is recommended
): parameter is ParameterGroup {
  return (parameter as ParameterGroup).parameters !== undefined
}

function toParameter(parameter: Parameter): Parameter {
  return {
    id: parameter.id,
    name: parameter.name,
    shortName: parameter.shortName,
  }
}

function toParameterGroup(parameter: {
  parameterGroup: string
  parameterType?: string
  unit?: string
  displayUnit?: string
  usesDatum?: string
}): ParameterGroup {
  const parameterGroup: ParameterGroup = {
    id: parameter.parameterGroup,
    parameterType:
      parameter.parameterType === 'instantaneous'
        ? 'instantaneous'
        : 'accumulative',
    unit: parameter.unit ?? '',
    parameters: [],
  }

  if (parameter.displayUnit !== parameter.unit)
    parameterGroup.displayUnit = parameter.displayUnit
  if (parameter.usesDatum === 'true') parameterGroup.usesDatum = true

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

    if (parameterGroupId === undefined) {
      if (isParameter(tsParameter)) result.parameters.push(toParameter(tsParameter))
      continue
    }

    const existingGroup = groupsById.get(parameterGroupId)
    if (isParameterGroup(existingGroup)) {
      if (isParameter(tsParameter)) existingGroup.parameters.push(toParameter(tsParameter))
      continue
    }

    const parameterGroup = toParameterGroup({
      parameterGroup: parameterGroupId,
      parameterType: tsParameter.parameterType,
      unit: tsParameter.unit,
      displayUnit: tsParameter.displayUnit,
      usesDatum: tsParameter.usesDatum,
    })

    if (isParameter(tsParameter)) {
      parameterGroup.parameters.push(toParameter(tsParameter))
    }

    groupsById.set(parameterGroupId, parameterGroup)
    result.parameters.push(parameterGroup)
  }

  return result
}
