import type { Records } from './records.js'
import type { TaskRun } from './taskRun.js'

export interface TaskRunsResponse extends Records {
  taskRuns: TaskRun[]
}
