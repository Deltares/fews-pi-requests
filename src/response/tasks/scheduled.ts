import { Records } from "../records";
import { TaskStatus } from "./taskStatus";

export interface ScheduledTasksResponse extends Records {
  tasks:             Task[];
  // Are there any remote Master Controllers available in the response. Can be used to filter out the mcId column.
  remoteMcAvailable: boolean;
  // Are there any whatIf scenario’s available in the resonsponse
  whatIfAvailable:   boolean;
  // Are there any tags available in the response
  tagAvailable:      boolean;
}

export interface Task {
  // Id
  taskId:                                     string;
  // Description
  description:                                string;
  // Workflow id
  workflowId:                                 string;
  // whatIf scenario id
  whatifId:                                   WhatifID;
  // whatIf scenario name
  whatifName:                                 null;
  tag:                                        string;
  // Master Controller id
  mcId:                                       null;
  // Priority
  priority:                                   number;
  // Interval
  interval:                                   string;
  // Next due time in milliseconds
  nextDueTime:                                number | null;
  // Last time a task should be scheduled
  endTime:                                    null;
  // Status
  taskStatus:                                 TaskStatus;
  // Latest Task Run dispatch time, the time the task was actually scheduled
  latestTaskRunDispatchTime:                  number | null;
  // Latest Task Run status
  latestTaskRunStatus:                        TaskStatus | null;
  // Latest Task Run Time, duration of the last run task in milliseconds
  latestTaskRunTime:                          number | null;
  // Latest Task Run scheduled time. The time the task was scheduled to run
  latestTaskRunScheduledTime:                 number | null;
  // Latest Task Run status of the task
  latestTaskRunCompletionTime:                number | null;
  // Can the task run in failover mode
  runOnFailover:                              number;
  // Should the forecast be approved
  approve:                                    number;
  // Repeat time of the task
  taskRepeatTime:                             null;
  // Dispatch time of the current forecast (most recent approved forecast).
  currentForecastDispatchTime:                null;
  // Current forecast dispatch time background color. Based on the ForecastManagement.xml configuration.
  currentForecastDispatchTimeBackgroundColor: null;
  // The failover policy ot the task. Only relevant for multi Master Controller systems. Default is RUN_DUTY.
  failoverPolicy:                             FailoverPolicy;
}

export enum FailoverPolicy {
  RunDuty = "RUN_DUTY",
  RunDutyAndFailover = "RUN_DUTY_AND_FAILOVER",
  SuspendDutyInFailover = "SUSPEND_DUTY_IN_FAILOVER",
}

export enum WhatifID {
  None = "None",
}