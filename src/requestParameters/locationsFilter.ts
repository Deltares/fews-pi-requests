import type { BaseFilter } from "./baseFilter.js";
import { DocumentFormat } from "./documentFormat.js";

export interface LocationsFilterParameters extends BaseFilter {
    filterId?: string;
    parameterIds?: string;
    parameterGroupId?: string;
    showAttributes?: boolean;
    includeLocationRelations?: boolean;
    includeTimeDependency?: boolean;
}

export interface LocationsFilterPiJSON extends LocationsFilterParameters {
    documentFormat: DocumentFormat.PI_JSON;
}

export interface LocationsFilterGeoJSON extends LocationsFilterParameters {
    documentFormat: DocumentFormat.GEO_JSON;
}

export type LocationsFilter = LocationsFilterPiJSON | LocationsFilterGeoJSON
