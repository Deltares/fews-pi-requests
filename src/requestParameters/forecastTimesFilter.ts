import type { BaseFilter } from "./baseFilter";

export interface ForecastTimesFilter extends BaseFilter {
  workflowId: string;
  timeZero: string;
}
