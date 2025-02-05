/* tslint:disable */

/**
 * LogDisplayLogsResponse PI_JSON
 */
export interface LogsDisplayLogsResponse {
  logs?: LogDisplayLogs[];
}
export interface LogDisplayLogs {
  /**
   * the row id of the log entry
   */
  id: number;
  /**
   * task run id of log entry
   */
  taskRunId: string;
  /**
   * event code
   */
  code: string;
  /**
   * log entry time
   */
  entryTime: string;
  /**
   * log message
   */
  text: string;
  /**
   * Log level
   */
  level: "INFO" | "WARN" | "ERROR";
  source: string;
  /**
   * Component that logged the message
   */
  componentId: "FS" | "MC" | "AI";
  /**
   * Event acknowledged
   */
  eventAcknowledged: boolean;
  /**
   * User id. For manual log entries only
   */
  user?: string;
  /**
   * Topology node id. For manual log entries only
   */
  topologyNodeId?: string;
}
