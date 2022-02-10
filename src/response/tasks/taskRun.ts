import { TaskStatus } from "./taskStatus";

/**
 * The tasks/{taskid}/taskruns resource is used to get all taskruns for a specified task id.
 */
export interface TaskRun {
  // Id of the task run
  taskRunId:             string;
  // Id of the task
  taskId:                string;
  // Description
  description:           string;
  // WorkflowId of the task
  workflowId:            string;
  // The scheduled time the task should be dispatched
  scheduledDispatchTime: number;
  // The actual time the task was dispatched
  taskDispatchTime:      number;
  // The time at which the task to completed.
  completionTime:        number;
  // Id of the forecasting shell server this task was run on
  fssId:                 string;
  // Hostname of the forecasting shell server this task was run on
  fssHostName:           string;
  // Directory (region home) of the forecasting shell server this task was run on
  fssDirectory:          string;
  // Status code of the task run
  status:                TaskStatus;
  // The total time the task has been running. The taskDispatchTime is used as starting point
  runTime:               number;
}

