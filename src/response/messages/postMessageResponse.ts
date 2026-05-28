/* tslint:disable */

export type StatusOfTheMessagePostRequestForExampleSuccessError = string;
export type ErrorCode = string;
export type OptionalStatusCode = number;
export type ErrorMessage = string;

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
  status: StatusOfTheMessagePostRequestForExampleSuccessError;
  /**
   * Optional errors
   */
  errors?: TopicsMessagesPostResponseError[];
}
export interface TopicsMessagesPostResponseError {
  code?: ErrorCode;
  statusCode?: OptionalStatusCode;
  message: ErrorMessage;
}
