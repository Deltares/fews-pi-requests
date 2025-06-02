/* tslint:disable */

export type IdRequiredWhenUpdatingAForecasterNote = number;
export type TaskRunIdRequiredWhenUpdatingAForecasterNote = string;
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
  id?: IdRequiredWhenUpdatingAForecasterNote;
  taskRunId?: TaskRunIdRequiredWhenUpdatingAForecasterNote;
  logMessage: LogMessage;
  noteGroupId: NoteGroupId;
  topologyNodeId?: TopologyNodeId;
  eventTime?: EventTime;
  logLevel?: LogLevel;
  userId?: UserIdIfTheWebserviceHasBeenSetupWithAuthenticationAnyPassedUserIdWillBeOverruledByTheAuthenticatedUser;
}
