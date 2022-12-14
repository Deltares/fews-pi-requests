import { BaseFilter } from "./baseFilter";
import { DocumentFormat } from "./documentFormat";

export interface LocationsParameters extends BaseFilter {
    filterId?: string;
    showAttributes?: boolean;
    includeLocationRelations?: boolean;
    includeTimeDependency?: boolean;
}

export interface LocationsFilterPiJSON extends LocationsParameters {
    documentFormat: DocumentFormat.PI_JSON;
}

export interface LocationsFilterGeoJSON extends LocationsParameters {
    documentFormat: DocumentFormat.GEO_JSON;
}

export type LocationsFilter = LocationsFilterPiJSON | LocationsFilterGeoJSON