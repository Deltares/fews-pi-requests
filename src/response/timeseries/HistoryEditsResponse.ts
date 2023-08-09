/* tslint:disable */

/**
 * HistoryEditsResponse PI_JSON
 */
export interface HistoryEditsResponse {
  /**
   * an array with edits for the requested times
   */
  historyEdits: HistoryEditResponse[];
}
export interface HistoryEditResponse {
  /**
   * Edit Time. For example: 2017-10-31T23:00:00Z
   */
  time: string;
  /**
   * edits for a single time
   */
  edits: EditsResponse[];
}
/**
 * edit response
 */
export interface EditsResponse {
  /**
   * A single edit for a single time for a certain time series
   */
  type?: "string";
  /**
   * The workflow or user id which change the value
   */
  workflowOrUserId: string;
  /**
   * Value for the selected time
   */
  value: string;
  /**
   * Flag for the selected time
   */
  flag: string;
  /**
   * Flag source for the selected time
   */
  flagSource: string;
  /**
   * Value source for the selected time
   */
  valueSource: string;
  /**
   * Value source for the selected time
   */
  comments: string;
}
