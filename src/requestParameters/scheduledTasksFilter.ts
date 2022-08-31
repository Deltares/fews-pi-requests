import { BaseFilter } from "./baseFilter";
import { OrderBy } from "./orderBy";

export interface ScheduledTasksFilter extends BaseFilter {
    // Filter option to hide one-off tasks. Default is false.
    hideOneOffTask?: boolean;
    // Filter option to hide finished tasks. Default is false.
    hideFinishedTask?: boolean;
    // Filter option to hide scheduled tasks. Default is false.
    hideScheduledTask?: boolean;
    // Filter option to show the current forecast dispatch time. The currentForecastDispatchTimeBackgroundColor will be returned as well if configured using the ForecastManagement.xml configuration. Default is false.
    showCurrentForecastDispatchTime?: boolean;
    // Unique sequence number that can be used to order asynchronous api requests.
    draw?: number;
    // Start index of the requested result.
    start?: number;
    // Length of the requested result.
    length?: number;
    // Name of the first column that should be used for sorting the results.
    order?: [OrderBy];
}