import type { BaseFilter } from "./baseFilter";

export interface LocationsFilter extends BaseFilter {
    filterId?: string;
    showAttributes?: boolean;
    showParentLocations?: boolean;
    includeLocationRelations?: boolean;
    includeTimeDependency?: boolean;
    includeIconNames?: boolean;
    attributeIds?: string | string[];
}
