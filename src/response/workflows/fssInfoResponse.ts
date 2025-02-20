/* tslint:disable */

/**
 * WorkflowFssInfo PI_JSON
 */
export interface WorkflowFssInfo {
  workflowFssInfo: WorkflowFssInfoClass;
}
export interface WorkflowFssInfoClass {
  forecastingShellCount: number;
  fssGroups: FssGroup[];
}
export interface FssGroup {
  id: string;
  name: string;
  forecastingShells: ForecastingShell[];
}
export interface ForecastingShell {
  id: number;
}
