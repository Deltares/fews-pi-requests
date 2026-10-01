import type { BaseFilter } from './baseFilter.js'

export interface DocumentDisplaysFilter extends BaseFilter {
  /**
   * the id of the document display. If not specified, all document displays are returned.
   */
  displayId?: string
}
