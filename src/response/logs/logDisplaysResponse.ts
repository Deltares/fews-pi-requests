/* tslint:disable */

/**
 * LogsDisplaysResponse PI_JSON
 */
export interface LogsDisplaysResponse {
  logDisplays?: LogsDisplay[];
}
export interface LogsDisplay {
  /**
   * the id of the logs display
   */
  id: string;
  /**
   * Name of the logs display
   */
  name: string;
  userAlerts?: LogDisplayUserAlerts;
  systemLog?: LogDisplaySystemLog;
  manualLog?: LogDisplayManualLog;
  logDissemination?: LogDisplayLogDissemination;
}
export interface LogDisplayUserAlerts {
  /**
   * Show message pop up
   */
  showMessagePopUp: boolean;
  /**
   * Show unread message icons in topology
   */
  showUnreadMessageIconsInTopology: boolean;
}
export interface LogDisplaySystemLog {
  logLevels?: ("INFO" | "WARN" | "ERROR")[];
  eventCodes?: string[];
}
export interface LogDisplayManualLog {
  /**
   * Note group id
   */
  noteGroupId: string;
}
export interface LogDisplayLogDissemination {
  disseminationActions: LogDisplayDisseminationAction[];
}
export interface LogDisplayDisseminationAction {
  /**
   * the id of the dissemination action
   */
  id: string;
  /**
   * Description of the dissemination action
   */
  description: string;
  /**
   * Icon id
   */
  iconId: string;
  /**
   * Manual log
   */
  manualLog: boolean;
  /**
   * System log
   */
  systemLog: boolean;
}
