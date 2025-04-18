import { BaseFilter } from "./baseFilter";

export interface filterActionsFilter extends BaseFilter {
  filterId?: string;
  parameterGroupIds?: string;
  parameterIds?: string;
  taskRunIds?: string;
  locationIds?: string;
  timeZero?: string;
  // If this parameter is set, resampling is applied using the passed method. It is required to also specify a resamplingTimeStepId. For information about the different methods, see: https://publicwiki.deltares.nl/x/xJUYBw
  resamplingMethod?:
    | "minimum"
    | "maximum"
    | "mean"
    | "mean_over_time"
    | "sum"
    | "instantaneous"
    | "percentile";
  // The target sampling time step id. The time step id must be configured in the TimeSeriesDisplay in the resampling element that refer to time steps that are configured in the TimeSteps.xml. It is required to also specify a resamplingMethod.
  resamplingTimeStepId?: string;
  // When resampling omit missing values. Default is true.
  resamplingOmitMissing?: boolean;
  includeNonResampled?: boolean;
  useDisplayUnits?: boolean;
  convertDatum?: boolean;
  currentForecastsAlwaysVisible?: boolean;
}
