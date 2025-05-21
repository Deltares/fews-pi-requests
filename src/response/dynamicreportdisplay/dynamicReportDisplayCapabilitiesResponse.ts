interface DimensionWithPeriod {
  name: string;
  units: string;
  default: string;
  period: string;
}

interface DimensionWithTimes {
  name: string;
  units: string;
  default: string;
  times: string;
}

export type Dimension = DimensionWithPeriod | DimensionWithTimes;

export interface DynamicReportDisplayCapabilitiesResponse {
  /**
   * DynamicReportDisplayCapabilities
   */
  dynamicReportDisplayCapabilities: {
    dimension?: Dimension;
    selectableLocations?: [
      {
        id: string;
        name: string;
        shortName: string;
      }
    ];
  };
}
