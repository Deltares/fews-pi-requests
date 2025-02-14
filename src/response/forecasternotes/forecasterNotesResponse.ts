/* tslint:disable */

/**
 * ForecasterNotesResponse PI_JSON
 */
export interface ForecasterNotesResponse {
  noteGroups?: ForecasterNoteGroup[];
}
export interface ForecasterNoteGroup {
  /**
   * the id of the logs display
   */
  id: string;
  /**
   * Name of the logs display
   */
  name: string;
  note: ForecasterNoteGroupNote;
}
export interface ForecasterNoteGroupNote {
  /**
   * the event code id
   */
  eventCodeId: string;
  /**
   * Number of lines in the note
   */
  maxNumberOfLines: number;
  /**
   * The maximum number of characters in a line
   */
  maxNumberOfCharactersInLine: number;
  /**
   * the id of the message template
   */
  messageTemplateId: string;
  messageTemplate: ForecasterNoteGroupNoteTemplate;
}
export interface ForecasterNoteGroupNoteTemplate {
  /**
   * the template message
   */
  message: string;
  /**
   * Height of the message
   */
  messageHeight: number;
  /**
   * Width of the message
   */
  messageWidth: number;
}
