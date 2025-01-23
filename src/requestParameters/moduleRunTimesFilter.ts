import type { BaseFilter } from "./baseFilter";

export interface ModuleRuntimesFilter extends BaseFilter {
    workflowId?: string;

    // TODO: Is this being used? Seems to be an invalid parameter.
    // Unique sequence number that can be used to order asynchronous api requests.
    draw?: number;
}
