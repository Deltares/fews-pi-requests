import { AttributeQueryParameter } from "./attributeQueryParameter";
import { DocumentFormat } from "./documentFormat";

export interface ArchiveLocationsFilterParameters {
    /**
     * Subset of locations for which to retrieve parameters.
     * This parameter has to be duplicated to specify multiple locations.
     */
     parameterIds?: string | string[];
     /**
      * attribute(key)=value (string): one or more attributes that have to match the archive attribute.
      *  Attributes are passed by passing the key as an argument to the attribute() parameter and the value as parameter value.
      */
     attribute?: AttributeQueryParameter;
}

export interface ArchiveLocationsFilterPiJSON extends ArchiveLocationsFilterParameters {
    documentFormat: DocumentFormat.PI_JSON;
}

export interface ArchiveLocationsFilterGeoJSON extends ArchiveLocationsFilterParameters {
    documentFormat: DocumentFormat.GEO_JSON;
}

export type ArchiveLocationsFilter = ArchiveLocationsFilterPiJSON | ArchiveLocationsFilterGeoJSON