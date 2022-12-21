import type { BaseFilter } from "./baseFilter";

export interface LocationsFilter extends BaseFilter {
    filterId?: string;
    parameterIds?: string;
    parameterGroupId?: string;
    showAttributes?: boolean;
    includeLocationRelations?: boolean;
    includeTimeDependency?: boolean;
}
