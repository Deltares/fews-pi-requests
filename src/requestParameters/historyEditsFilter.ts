import type { BaseFilter } from "./baseFilter";

export interface HistoryEditsFilter extends BaseFilter {
    times: string[];
    editUrl: string;
}
