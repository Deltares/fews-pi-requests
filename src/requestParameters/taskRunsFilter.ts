import type { BaseFilter } from "./baseFilter";

export interface TaskRunsFilter extends BaseFilter {
    onlyCurrent?: boolean;
    onlyForecasts?: boolean;
    startDispatchTime?: string;
    endDispatchTime?: string;
    startForecastTime?: string;
    endForecastTime?: string;
    topologyNodeId?: string;
    workflowId?: string;
    scenarioId?: string;
    mcId?: string;
    taskRunStatusIds?: string | string[];
    taskRunIds?: string | string[];
    taskRunCount?: number;
    forecastCount?: number;
}
