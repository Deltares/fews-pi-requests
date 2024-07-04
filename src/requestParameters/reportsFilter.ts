import type { BaseFilter } from "./baseFilter";

export interface ReportsFilter extends BaseFilter {
    /**
     * Identifier of the report module instance id to retrieve
     */
    moduleInstanceIds?: string | string[];
}
