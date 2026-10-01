import type { BaseFilter } from './baseFilter.js'

export interface LocationsTooltipFilter extends BaseFilter {
  filterId?: string
  locationId?: string
}
