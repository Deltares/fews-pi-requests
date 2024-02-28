import type { BaseFilter } from "./baseFilter";

export interface ParametersFilter extends BaseFilter {
    filterId?: string | string[]
    useDisplayUnits?: boolean
    showAttributes?: boolean
}