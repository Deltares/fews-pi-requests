/* tslint:disable */

export type LogMessage = string;
export type NoteGroupId = string;
export type TopologyNodeId = string;
export type EventTime = string;
export type LogLevel = "INFO" | "WARN" | "ERROR";
export type UserIdIfTheWebserviceHasBeenSetupWithAuthenticationAnyPassedUserIdWillBeOverruledByTheAuthenticatedUser =
  string;

/**
 * ForecasterNoteRequest PI_JSON
 */
export interface ForecasterNoteRequest {
  id?: number;
  taskRunId?: string;
  logMessage: LogMessage;
  noteGroupId: NoteGroupId;
  topologyNodeId?: TopologyNodeId;
  eventTime?: EventTime;
  logLevel?: LogLevel;
  userId?: UserIdIfTheWebserviceHasBeenSetupWithAuthenticationAnyPassedUserIdWillBeOverruledByTheAuthenticatedUser;
}

export interface ForecasterNoteKey {
  id: number;
  taskRunId: string;
}
export interface ForecasterNoteKeysRequest {
  logs: ForecasterNoteKey[];
}
