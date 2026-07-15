/* tslint:disable */

/**
 * ForecasterNoteRequest PI_JSON
 */
export interface ForecasterNoteRequest {
  /**
   * Id, required when updating a forecaster note.
   */
  id?: number;
  /**
   * Task Run Id, required when updating a forecaster note
   */
  taskRunId?: string;
  /**
   * Log Message
   */
  logMessage: string;
  /**
   * Note Group Id
   */
  noteGroupId: string;
  /**
   * Topology Node Id
   */
  topologyNodeId?: string;
  /**
   * Event Time
   */
  eventTime?: string;
  /**
   * Log Level
   */
  logLevel?: "INFO" | "WARN" | "ERROR";
  /**
   * User Id. If the webservice has been setup with authentication, any passed userId will be overruled by the authenticated user.
   */
  userId?: string;
}
