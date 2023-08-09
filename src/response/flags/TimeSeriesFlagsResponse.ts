/* tslint:disable */

/**
 * TimeSeriesFlags PI_JSON
 */
export interface TimeSeriesFlagsResponse {
  flags?: TimeSeriesFlag[];
}
export interface TimeSeriesFlag {
  /**
   * the name of the flag
   */
  flag: string;
  /**
   * Name of the flag
   */
  name: string;
  source: "ORIGINAL" | "CORRECTED" | "COMPLETED" | null;
  quality: "RELIABLE" | "DOUBTFUL" | "UNRELIABLE" | null;
}
