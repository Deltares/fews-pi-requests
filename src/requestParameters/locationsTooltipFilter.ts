import type { BaseFilter } from "./baseFilter";

export interface LocationsTooltipFilter extends BaseFilter {
    filterId?: string;
    locationId?: string;
}
