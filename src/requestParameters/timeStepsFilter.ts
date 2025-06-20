export interface TimeStepsFilter {
  /** @description Only timesteps configured for resampling will be returned */
  onlyResampling?: boolean;
  /** @description Supported Document Format: PI_JSON,  */
  documentFormat?: "PI_JSON";
  /** @description Document Version. Latest version is: 1.34 */
  documentVersion?: string;
}
