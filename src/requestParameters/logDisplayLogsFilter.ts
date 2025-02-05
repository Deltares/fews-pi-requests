import type { BaseFilter } from "./baseFilter";

export interface LogDisplayLogsFilter extends BaseFilter {
  /**
   * the id of the log display
   */
  logDisplayId: string;
  /**
   * Type of the log. Default is system.
   */
  logType?: "system" | "manual";
  /**
   * Start time of the log. Format: yyyy-MM-ddTHH:mm:ssZ
   */
  startTime?: string;
  /**
   * End time of the log. Format: yyyy-MM-ddTHH:mm:ssZ
   */
  endTime?: string;
  /**
   * Level of the log.
   */
  level?: string;
  /**
   * Source of the log.
   */
  source?: string;
  /**
   * Event code of the log.
   */
  eventCode?: string;
  /**
   * Text of the log message.
   */
  text?: string;
  /**
   * Task run id of the task run to retrieve.
   */
  taskRunId?: string;
  /**
   * Maximum number of log messages to retrieve. Default is 1000.
   */
  maxCount?: number;
}
