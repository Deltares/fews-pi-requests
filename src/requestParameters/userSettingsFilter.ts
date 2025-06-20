export interface UserSettingsFilter {
  /** @description Get the user settings for the specified user. If not specified, the user settings for the current authenticated user will be returned. */
  userId?: string;
  /** @description topic id of the user settings json file */
  topicId: string;
  /** @description Supported Document Format: PI_JSON,  */
  documentFormat?: "PI_JSON";
  /** @description Document Version. Latest version is: 1.34 */
  documentVersion?: string;
}
