import type { BaseFilter } from './baseFilter.js'

export interface MicroFrontEndsFilter extends BaseFilter {
  /**
   * the id of the micro front end configuration
   */
  microFrontEndId?: string
}
