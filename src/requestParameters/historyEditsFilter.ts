import type { BaseFilter } from "./baseFilter";

export interface HistoryEditsFilter extends BaseFilter {
    times: string[];
    locationId: string;
    ensembleId?: string;
    ensembleMemberId?: string;
    timeSeriesSetIndex: number;
}
