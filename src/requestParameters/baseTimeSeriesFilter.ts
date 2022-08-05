import BaseFilter from "@/requestParameters/baseFilter";

export interface BaseTimeSeriesFilter extends BaseFilter {
    // (dateTime: yyyy-MM-ddTHH:mm:ssZ): End time of search period that looks for time series values that lie within this period.
    endTime?: string;
    // (dateTime: yyyy-MM-ddTHH:mm:ssZ): Start time of search period that looks for time series values that lie within this period.
    startTime?: string;
    // (boolean, default true): import data from external data source (Archive). (since 2017.02)
    importFromExternalDataSource?: boolean;
    // (boolean): Toggle omitting or returning of missing values in response
    omitMissing?: boolean;
    // (boolean): Toggle to return only header information or also data
    onlyHeaders?: boolean;
    // (boolean): Toggle to return only forecast timeSeries
    onlyForecasts?: boolean;
    // (boolean): Toggle to return only manual edits.
    onlyManualEdits?: boolean;
    // (boolean): Toggle to display product information that is assigned to a forecast. (Since 2019.02). See below for an example.
    showProducts?: boolean;
    // (boolean): Toggle to return statistics information about timeseries. Typically used in combination with onlyHeaders. Returns additional information about data availability of timeseries (Since 2015.01).
    // * firstValueTime: First time with a value in the timeSeries
    // * lastValueTime: Last time with a value in the timeSeries
    // * maxValue: Maximum value in the timeSeries
    // * minValue: Minimum value in the timeSeries
    // * valueCount: Number of values in the timeSeries
    showStatistics?: boolean;
    // (boolean): Option to toggle the returning of threshold information in the headers
    showThresholds?: boolean;
    // (boolean): Show ensemble member ids.
    showEnsembleMemberIds?: boolean;
    // (long): unit ms/pixel. Thinning is used to retrieve the visually interesting time steps of timeSeries. It tries to keep the peaks and gaps and minimizes the number of time steps that have to be retrieved. It is typically used for visualizations. The value to be specified should be equal to the view period in milliseconds of the timeSeries that is visualized divided by the number of pixels that are available for display. For example: visualizing a view period of 5 years (157784760000 milliseconds) on a display of 1024 pixels, the thinning parameter should be set to 157784760000/1024 = 15408668. (Since 2019.02)
    thinning?: number;
    // (boolean): Export values using display units.
    useDisplayUnits?: boolean;
    // (boolean) Optional argument. Default is false. If it is set to true, the response will contain milliseconds. See example below. Since 2019.02
    useMilliseconds?: boolean;
}
