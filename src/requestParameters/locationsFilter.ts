import BaseFilter from "@/requestParameters/baseFilter";

export interface LocationsFilter extends BaseFilter {
    filterId: string;
    showAttributes: boolean;
    includeLocationRelations?: boolean;
    includeTimeDependency?: boolean;
}
