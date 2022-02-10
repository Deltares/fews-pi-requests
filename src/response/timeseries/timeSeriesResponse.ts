import { TimeSeriesResult } from "./timeSeriesResults";

export interface TimeSeriesResponse {
    version?: string;
    timeZone?: string; // Can be a number (offset in hours) or a string with the (daylight savings) time zone (see pi_sharedtypes.xsd)
    timeSeries: TimeSeriesResult[];
  }
  