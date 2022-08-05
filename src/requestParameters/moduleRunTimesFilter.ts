import BaseFilter from "@/requestParameters/baseFilter";

export interface ModuleRuntimesFilter extends BaseFilter {
    // Unique sequence number that can be used to order asynchronous api requests.
    draw?: number;
}
