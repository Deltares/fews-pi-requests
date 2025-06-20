export interface PostUserSettingsFilter {
  /** @description Optional User id in case no authentication is used. If authentication is used, the userId of the authenticated user will be used */
  userId?: string;
  /** @description topic id of the user settings json file */
  topicId: string;
}
