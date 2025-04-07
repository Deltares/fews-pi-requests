import type { BaseFilter } from "./baseFilter";

export interface ReportFilter extends BaseFilter {
    /**
     * Identifier of the report module instance id to retrieve
     */
    moduleInstanceIds: string | string[];
    /**
     * Identifier of the report module task run id to retrieve
     */
    taskRunId: string;
    /**
    * Identifier of the report id to retrieve unique within a module instance and task run
    */
    reportId: string;
}
