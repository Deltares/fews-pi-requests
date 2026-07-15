/* tslint:disable */

/**
 * Status of a posted message.
 */
export interface MessagesResponse {
  /**
   * Indicates if message was successfully sent to all recipients.
   */
  allSuccess?: boolean;
  /**
   * Indicates if message failed to be sent to all recipients.
   */
  allFailed?: boolean;
  /**
   * Indicates if message arrived at all recipients.
   */
  allArrived?: boolean;
  /**
   * Messages sent to recipients.
   */
  messages: MessageResponse[];
}
export interface MessageResponse {
  /**
   * Status
   */
  status: "failed" | "success" | "unknown";
  /**
   * Optional description of the status.
   */
  statusDescription?: string;
  /**
   * Optional id of the message that was sent to a recipient.
   */
  id?: string;
  /**
   * Date the message arrived at the recipient in UTC format.
   */
  arrived?: string;
}
