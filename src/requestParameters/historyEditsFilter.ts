import type { BaseFilter } from './baseFilter.js'

export interface HistoryEditsFilter extends BaseFilter {
  times: string[]
  editUrl: string
}
