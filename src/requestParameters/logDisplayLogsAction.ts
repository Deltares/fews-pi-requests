import type { ForecasterNoteRequest } from './forecasterNoteBody.js'

export interface LogDisplayLogsActionRequest extends Pick<
  ForecasterNoteRequest,
  'logMessage' | 'logLevel' | 'userId'
> {
  /**
   * the id of the log display
   */
  logDisplayId: string
  actionId: string
}
