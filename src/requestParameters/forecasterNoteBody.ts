/* tslint:disable */

export type LogMessage = string;
export type NoteGroupId = string;
export type TopologyNodeId = string;
export type EventTime = string;
export type LogLevel = "INFO" | "WARN" | "ERROR";
export type EventCodeId = string;
export type UserIdIfTheWebserviceHasBeenSetupWithAuthenticationAnyPassedUserIdWillBeOverruledByTheAuthenticatedUser =
  string;

/**
 * ForecasterNoteRequest PI_JSON
 */
export interface ForecasterNoteRequest {
  logMessage: LogMessage;
  noteGroupId: NoteGroupId;
  topologyNodeId?: TopologyNodeId;
  eventTime?: EventTime;
  logLevel?: LogLevel;
  eventCodeId?: EventCodeId;
  userId?: UserIdIfTheWebserviceHasBeenSetupWithAuthenticationAnyPassedUserIdWillBeOverruledByTheAuthenticatedUser;
}
