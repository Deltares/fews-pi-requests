import type { BaseFilter } from "./baseFilter";

export interface ReportFilter extends BaseFilter {
    /**
     * Identifier of the report module instance id to retrieve
     */
    moduleInstanceIds?: string | string[];
    /**
     * Identifier of the report module instance id to retrieve
     */
    taskRunId?: string;
    /**
    * Identifier of the report id to retrieve
    */
    reportId?: string;
}
