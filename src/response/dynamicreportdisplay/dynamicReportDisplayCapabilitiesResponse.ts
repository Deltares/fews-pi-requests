export interface DimensionWithPeriod {
  name: string;
  units: string;
  default: string;
  period: string;
}

export interface DimensionWithTimes {
  name: string;
  units: string;
  default: string;
  times: string;
}

export function isDimensionWithPeriod(
  dimension: DimensionWithPeriod | DimensionWithTimes
): dimension is DimensionWithPeriod {
  return (dimension as DimensionWithPeriod).period !== undefined;
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
