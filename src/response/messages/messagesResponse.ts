/* tslint:disable */

export type IndicatesIfMessageWasSuccessfullySentToAllRecipients = boolean;
export type IndicatesIfMessageFailedToBeSentToAllRecipients = boolean;
export type IndicatesIfMessageArrivedAtAllRecipients = boolean;
export type Status = "failed" | "success" | "unknown";
export type OptionalDescriptionOfTheStatus = string;
export type OptionalIdOfTheMessageThatWasSentToARecipient = string;
export type DateTheMessageArrivedAtTheRecipientInUTCFormat = string;

/**
 * Status of a posted message.
 */
export interface MessagesResponse {
  allSuccess?: IndicatesIfMessageWasSuccessfullySentToAllRecipients;
  allFailed?: IndicatesIfMessageFailedToBeSentToAllRecipients;
  allArrived?: IndicatesIfMessageArrivedAtAllRecipients;
  /**
   * Messages sent to recipients.
   */
  messages: MessageResponse[];
}
export interface MessageResponse {
  status: Status;
  statusDescription?: OptionalDescriptionOfTheStatus;
  id?: OptionalIdOfTheMessageThatWasSentToARecipient;
  arrived?: DateTheMessageArrivedAtTheRecipientInUTCFormat;
}
