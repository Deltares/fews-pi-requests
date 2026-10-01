import type { BaseFilter } from './baseFilter.js'

export interface LocationsFilter extends BaseFilter {
  filterId?: string
  showAttributes?: boolean
  showParentLocations?: boolean
  showThresholds?: boolean
  showTimeSeriesInfo?: boolean
  includeLocationRelations?: boolean
  includeTimeDependency?: boolean
  includeIconNames?: boolean
  attributeIds?: string | string[]
  locationIds?: string | string[]
  parameterIds?: string | string[]
}
