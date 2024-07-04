/* tslint:disable */

/**
 * ReportsResponse PI_JSON
 */
export interface ReportsResponse {
  reports?: Report[];
  [k: string]: unknown;
}
export interface Report {
  /**
   * the module instance id of the report
   */
  moduleInstanceId: string;
  /**
   * the mime type of the report
   */
  mimeType: string;
  /**
   * Indicates if the task run is current or not
   */
  items: ReportItem[];
}
/**
 * The combination of a moduleInstanceId, taskRunId and reportId uniquely identifies a report
 */
export interface ReportItem {
  /**
   * the module instance id of the report
   */
  moduleInstanceId: string;
  /**
   * the task run id of the report
   */
  taskRunId: string;
  /**
   * the id of the report.
   */
  reportId: number;
  /**
   * the time zero of the report
   */
  timeZero: string;
  /**
   * Indicates if the report is current (most recent approved report).
   */
  isCurrent: boolean;
}
