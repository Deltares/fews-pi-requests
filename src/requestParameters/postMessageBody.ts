/* tslint:disable */

/**
 * Topics Messages with attachments
 */
export interface TopicsMessagesWithAttachments {
  /**
   * Subject of the message
   */
  subject: string;
  /**
   * Body of the message in plain text
   */
  bodyText?: string;
  /**
   * Body of the message in plain text that will be resolved by the server using the provided id. The id should be a reference to an archived text message body.
   */
  bodyTextId?: string;
  /**
   * Body of the message in HTML format
   */
  bodyHtml?: string;
  /**
   * Body of the message in html that will be resolved by the server using the provided id. The id should be a reference to an archived html message body.
   */
  bodyHtmlId?: string;
  /**
   * TopicMessageAttachment
   */
  attachments?: TopicMessageAttachment[];
  /**
   * Message Id. Can be used to correlate the message with an external system. The messages endpoint can  be used to retrieve the messages metadata
   */
  messageId?: string;
}
export interface TopicMessageAttachment {
  /**
   * Attachment Id. If the attachment content is not provided, the server will try to resolve the attachment content using this id as a reference to an archived attachment.
   */
  attachmentId: string;
  /**
   * Base64 encoded content of the attachment. If provided, the attachmentId is not used to resolve the content.
   */
  base64Content?: string;
  /**
   * Filename of the attachment. Only provide if the attachment content is provided in the request.
   */
  filename?: string;
  /**
   * Content type of the attachment. Only provide if the attachment content is provided in the request.
   */
  contentType?: string;
  /**
   * Whether the attachment is an inline attachment or not. Only provide if the attachment content is provided in the request and is referenced from the body HTML content.
   */
  inline?: boolean;
}
