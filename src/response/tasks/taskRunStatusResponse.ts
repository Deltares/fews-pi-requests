/* tslint:disable */

export interface TaskRunStatusResponse {
  version: string;
  code: "I" | "P" | "T" | "R" | "F" | "C" | "D" | "A" | "B" | "null" | null;
  description: string;
  /**
   * Since 2024.01. the taskrun id for this task run. null if not available
   */
  taskRunId?: string;
}
