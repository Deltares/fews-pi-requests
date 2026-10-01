import type { BaseFilter } from './baseFilter.js'

export interface ParametersFilter extends BaseFilter {
  filterId?: string | string[]
  useDisplayUnits?: boolean
  showAttributes?: boolean
}
