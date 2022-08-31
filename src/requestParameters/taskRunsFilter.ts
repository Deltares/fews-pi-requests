import { BaseFilter } from "./baseFilter";

export interface TaskRunsFilter extends BaseFilter {
    // Unique sequence number that can be used to order asynchronous api requests.
    draw?: number;
}