import type {
  LogLevel,
  LogMessage,
  UserIdIfTheWebserviceHasBeenSetupWithAuthenticationAnyPassedUserIdWillBeOverruledByTheAuthenticatedUser,
} from "./forecasterNoteBody";

export interface LogDisplayLogsActionRequest {
  /**
   * the id of the log display
   */
  logDisplayId: string;
  actionId: string;
  logMessage: LogMessage;
  logLevel?: LogLevel;
  userId?: UserIdIfTheWebserviceHasBeenSetupWithAuthenticationAnyPassedUserIdWillBeOverruledByTheAuthenticatedUser;
}
