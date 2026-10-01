import { BaseFilter } from './baseFilter.js'

export interface TopologyActionFilter extends BaseFilter {
  nodeId: string
  taskRunIds?: string | string[]
  timeZero?: string
  startForecastTime?: string
  endForecastTime?: string
  forecastCount?: number
  useDisplayUnits?: boolean
  convertDatum?: boolean
  currentForecastsAlwaysVisible?: boolean
}
