import { BaseFilter } from "./baseFilter";

export interface TopologyActionFilter extends BaseFilter {
  nodeId: string;
  timeZero?: string;
  useDisplayUnits?: boolean;
  convertDatum?: boolean;
  currentForecastsAlwaysVisible?: boolean;
}

