import { BaseFilter } from "./baseFilter";

export interface TaskRunsFilter extends BaseFilter {
    onlyCurrent?: boolean;
    startDispatchTime?: string;
    endDispatchTime?: string;
    startForecastTime?: string;
    endForecastTime?: string;
    workflowId?: string;
    scenarioId?: string;
    mcId?: string;
    taskRunStatusIds?: string | string[];

}