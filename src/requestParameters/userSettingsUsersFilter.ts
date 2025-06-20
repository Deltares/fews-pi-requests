export interface UserSettingsUsersFilter {
  /** @description topic id for which to get the users that have saved this topic */
  topicId: string;
  /** @description Supported Document Format: PI_JSON,  */
  documentFormat?: "PI_JSON";
  /** @description Document Version. Latest version is: 1.34 */
  documentVersion?: string;
}
