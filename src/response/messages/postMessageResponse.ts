/* tslint:disable */

/**
 * Response after a Topics Messages post request.
 */
export interface TopicsMessagesPostResponse {
  /**
   * Messages
   */
  messages: TopicsMessagesPostResponse1[];
}
export interface TopicsMessagesPostResponse1 {
  /**
   * Status of the message post request. For example: success, error
   */
  status: string;
  /**
   * Optional errors
   */
  errors?: TopicsMessagesPostResponseError[];
}
export interface TopicsMessagesPostResponseError {
  /**
   * Error code.
   */
  code?: string;
  /**
   * Optional status code.
   */
  statusCode?: number;
  /**
   * Error message.
   */
  message: string;
}
