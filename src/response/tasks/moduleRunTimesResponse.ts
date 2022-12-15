import type { ModuleRunTime } from "./moduleRuntime";
import type { Records } from "./records";

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
 export interface ModuleRuntimesResponse extends Records {
    moduleRunTimes:  ModuleRunTime[];
}