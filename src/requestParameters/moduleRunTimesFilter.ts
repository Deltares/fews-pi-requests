import type { BaseFilter } from './baseFilter.js'

export interface ModuleRuntimesFilter extends BaseFilter {
  /**
   * Filter module run time with the specified workflowId
   */
  workflowId?: string
  /**
   * Include manual tasks in the filter
   */
  includeManualTasks: boolean
}
