/**
 * The tasks/moduleruntimes resource is used to get all expected runtimes for workflows per module instance id.
 * The list can optionally be filtered by workflowId.
 *
 * Only workflows of scheduled tasks that contain module instance descriptors that have been configured with
 * updateModuleRunTimesOnCompletion enabled, will be available in this end point. The expected start time of
 * a module is calculated based on the scheduled next due time and the expected pending duration time.
 * The expected end time of a module is calculated based on the scheduled next due time,
 * the expected pending duration time and the expected running time. For triggered tasks,
 * the expected start time and end time won’t be available until the task is actually started.
 */


export interface ModuleRunTime {
  // Id of Master Controller
  mcId:                    string;
  // Workflow Id
  workflowId:              string;
  // The instance id of the module
  moduleInstanceId:        string;
  // The expected duration the module will be in the pending state after the workflow has been started
  expectedPendingDuration: number;
  // Expected duration of the module run
  expectedRunningDuration: number;
  // Expected time the module run will start
  expectedStartTime:       number;
  // Expected time the module run will be completed
  expectedCompletionTime:  number;
}
