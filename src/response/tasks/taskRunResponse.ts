import type { Records } from "./records";
import type { TaskRun } from "./taskRun";

export interface TaskRunsResponse extends Records {
    taskRuns: TaskRun[];
}
