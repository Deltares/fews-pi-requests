import type { ParameterOutputType } from './parameterOutputType.js'

export interface ParameterOutputOptions {
  type: ParameterOutputType
}

export interface ParameterGroupsOutputOptions extends ParameterOutputOptions {
  type: 'parameterGroups'
}
