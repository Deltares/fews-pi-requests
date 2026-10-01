import type { BaseFilter } from './baseFilter.js'

export interface ForecastTimesFilter extends BaseFilter {
  workflowId: string
  timeZero: string
}
