import { Records } from "./records";
import { TaskRun } from "./taskRun";

export interface TaskRunsResponse extends Records {
    taskRuns: TaskRun[];
}
