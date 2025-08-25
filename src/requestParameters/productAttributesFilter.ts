import type { BaseFilter } from "./baseFilter";
import type { AttributeQueryParameter } from "./attributeQueryParameter";

export interface productAttributesFilter extends BaseFilter {
    /**
     * Relative path to the metadata file.
     */
    relativePath: string;
    /**
     * attribute(key)=value (string): one or more attributes that have to match the archive attribute.
     *  Attributes are passed by passing the key as an argument to the attribute() parameter and the value as parameter value.
     */
    attribute: AttributeQueryParameter;
}
