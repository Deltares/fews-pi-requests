export interface DynamicReportDisplayCapabilitiesResponse {
  /**
   * DynamicReportDisplayCapabilities
   */
  dynamicReportDisplayCapabilities: {
    dimension?: {
      name: string;
      units: string;
      default: string;
      period: string;
    };
    selectableLocations?: [
      {
        id: string;
        name: string;
        shortName: string;
      }
    ];
  };
}
