import { BaseFilter } from "./baseFilter";

export interface filterActionsFilter extends BaseFilter {
  filterId?: string;
  parameterGroupIds?: string;
  parameterIds?: string;
  taskRunIds?: string;
  locationIds?: string;
  timeZero?: string;
  useDisplayUnits?: boolean;
  convertDatum?: boolean;
  currentForecastsAlwaysVisible?: boolean;
}
