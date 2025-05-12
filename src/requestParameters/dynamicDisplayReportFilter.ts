export interface DynamicReportDisplayCapabilitiesFilter {
  /**
   * Identifier of the dynamic report module instance id to retrieve
   */
  displayId: string;
  /**
   * Identifier of the dynamic report module timeZero to retrieve (default is the current time)
   */
  timeZero?: string;
}

export interface DynamicReportDisplayFilter
  extends DynamicReportDisplayCapabilitiesFilter {
  /**
   * Identifier of the dynamic report module location id to retrieve
   */
  locationId?: string;
  /**
   * Identifier of the dynamic report module time to retrieve (default is the current time)
   */
  time?: string;
}
