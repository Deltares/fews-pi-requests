import type { Parameter } from './parameter.js'
import type { ParameterGroup } from './parameterGroup.js'

export interface ParameterGroupsOutput {
  parameters: (ParameterGroup | Parameter)[]
}
