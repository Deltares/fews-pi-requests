import type { BaseFilter } from './baseFilter.js'

export interface LogDisplaysFilter extends BaseFilter {
  /**
   * the id of the log display
   */
  logDisplayId: string
}
