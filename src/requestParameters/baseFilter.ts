import { DocumentFormat } from "./documentFormat";

export interface BaseFilter {
    /** File format version 1.9 or up */
    documentVersion?: string;
    /** PI_XML (default) or PI_JSON */
    documentFormat?: DocumentFormat;
}