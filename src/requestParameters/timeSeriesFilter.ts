import type { BaseTimeSeriesFilter } from "./baseTimeSeriesFilter";
import type { QualifierIdsQueryParameter } from "./qualifierIdsQueryParameter";
import type { TimeSeriesType } from "./timeSeriesType";

export interface TimeSeriesFilter extends BaseTimeSeriesFilter {
    // (boolean): Convert values from relative location height to absolute height values.
    convertDatum?: boolean;
    // (dateTime: yyyy-MM-ddTHH:mm:ssZ): End time of search period that looks for creation time of time series. Note: creation time of time series is actually the creation time of the task that produced/imported these time series.
    endCreationTime?: string;
    // (dateTime: yyyy-MM-ddTHH:mm:ssZ): End time of search period that looks for time series produced by forecasts that have their forecast time within this period.
    endForecastTime?: string;
    // (string): Ensemble identifier of for time series
    ensembleId?: string;
    // (dateTime format: yyyy-MM-ddTHH:mm:ssZ): Time value of external forecast time. This parameter has to be duplicated to specify multiple multiple externalForecastTimes.
    externalForecastTimes?: string | string[];
    // (string): An existing subfilter of the default filter id. N.B. Can be used in combination with taskRunIds since 2020.01.
    filterId?: string;
    // Number of forecast runs to return when using start- and end- forecast time. Default is 1.
    forecastCount?: number;
    // (string): Subset of locations for which to retrieve time series. This parameter can be duplicated to use multiple locationIds.
    locationIds?: string | string[];
    // (string): Subset of moduleInstances for which to retrieve time series. This parameter can be duplicated to specify multiple moduleInstanceIds.
    moduleInstanceIds?: string | string[];
    // (string): Subset of parameters for which to retrieve time series. This parameter has to be duplicated to specify multiple parameters.
    parameterIds?: string | string[];
    // (string): Subset of qualifiers for which to retrieve time series. This parameter has to be duplicated to specify multiple qualifierIds.
    qualifierIds?: QualifierIdsQueryParameter;
    // (string): Explicitly filter on a specific time series type. (Since 2020.01).
    timeSeriesType?: TimeSeriesType;
    // (dateTime format: yyyy-MM-ddTHH:mm:ssZ): Start time of search period that looks for creation time of time series. Note: creation time of time series is actually the creation time of the task that produced/imported these time series.
    startCreationTime?: string;
    // (dateTime: yyyy-MM-ddTHH:mm:ssZ): Start time of search period that looks for time series produced by forecasts that have their forecast time within this period.
    startForecastTime?: string;
    // (string): Subset of task run ids for which to retrieve time series. This parameter has to be duplicated to specify multiple taskRuns.  N.B. cannot be used in combination with a filterId.
    taskRunIds?: string;
    // (string): filter time series by the timestep that has been configured in the TimeSteps.xml. (since 2018.02). N.B.: It is not required to use the timeStepId's in the filter configurations to be able to use them as long as they have been configured in the TimeSteps.xml.
    timeStepId?: string;
    // (number): Default value is -1 in which case the index is not used.
    timeSeriesSetIndex?: number;
}
