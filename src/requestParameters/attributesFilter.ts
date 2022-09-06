import { BaseFilter } from "./baseFilter";
import { AttributeQueryParameter } from "./attributeQueryParameter";

export interface AttributesFilter extends BaseFilter {
    /**
     * Subset of archive attribute keys.
     * Only attributes with this key will be returned.
     * This parameter is useful to get all values for a specific attribute.
     */
    attributes?: string[];
    /**
     * Location for which to retrieve attributes.
     */
    locationId?: string;
    /**
     * Parmameter for which to retrieve attributes.
     */
    parameterId?: string;
}
