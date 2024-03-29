import type { BaseFilter } from "./baseFilter";
import type {AttributeQueryParameter} from "./attributeQueryParameter";

export interface ArchiveParametersFilter extends BaseFilter {
    /**
     * Subset of locations for which to retrieve parameters.
     * This parameter has to be duplicated to specify multiple locations.
     */
    locationIds?: string | string[];
    /**
     * attribute(key)=value (string): one or more attributes that have to match the archive attribute.
     *  Attributes are passed by passing the key as an argument to the attribute() parameter and the value as parameter value.
     */
    attribute?: AttributeQueryParameter;
}