import { BaseFilter } from './baseFilter.js'

export interface TaskRunStatusFilter extends BaseFilter {
  /** Task Id */
  taskId: string
  /** Max waiting time in milliseconds */
  maxWaitMillis?: string
}
