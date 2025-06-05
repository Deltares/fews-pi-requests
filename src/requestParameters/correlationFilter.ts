import type { BaseFilter } from "./baseFilter";

export interface CorrelationFilter extends BaseFilter {
  /** Id of the time series for the y axis */
  timeSeriesIdYaxis: string;
  /** Id of the time series for the x axis */
  timeSeriesIdXaxis: string;
  /** Start time for the correlation in format: yyyy-MM-ddTHH:mm:ssZ */
  startTime?: string;
  /** End time for the correlation in format: yyyy-MM-ddTHH:mm:ssZ */
  endTime?: string;
  /** Type of regression equation to be used */
  regressionEquation:
    | "exponential multiply"
    | "hyperbolic"
    | "logarithmic"
    | "power"
    | "simple linear"
    | "multiple linear";
  /** values above the threshold will not be taken into account */
  upperThreshold?: number;
  /** values below the threshold will not be taken into account */
  lowerThreshold?: number;
}
