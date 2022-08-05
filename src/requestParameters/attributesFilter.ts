import BaseFilter from "@/requestParameters/baseFilter";
import {AttributeQueryParameter} from "@/requestParameters/attributeQueryParameter";

export interface AttributesFilter extends BaseFilter {
    /**
     * Subset of archive attribute keys.
     * Only attributes with this key will be returned.
     * This parameter has to be duplicated to specify multiple attributes.
     * This parameter is useful to get all values for a specific attribute.
     */
    attributes?: string | string[];
    /**
     * Subset of locations for which to retrieve parameters.
     * This parameter has to be duplicated to specify multiple locations.
     */
    locationIds?: string | string[];
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
