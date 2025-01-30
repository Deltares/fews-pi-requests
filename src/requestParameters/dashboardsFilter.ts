import type { BaseFilter } from "./baseFilter";

export interface DashboardsFilter extends BaseFilter {
    dashboardId?: string;
}
