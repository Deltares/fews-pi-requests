export enum DocumentFormat {
  PI_XML = 'PI_XML',
  PI_JSON = 'PI_JSON',
  GEO_JSON = 'GEO_JSON'
}

/** attribute(key)=value (string) */
export type AttributeQueryParameter = {
  [key: string]: string | string[];
}

/** 'qualifierIds=key'=value (string) */
export type QualifierIdsQueryParameter  = {
  [key: string]: string | string[];
}

interface BaseFilter {
  /** File format version 1.9 or up */
  documentVersion?: string;
  /** PI_XML (default) or PI_JSON */
  documentFormat?: DocumentFormat;
}

export interface ParametersFilter extends BaseFilter {
  /**
   * Subset of locations for which to retrieve parameters.
   * This parameter has to be duplicated to specify multiple locations.
   */
  locationIds?: string | string[];
  /**
   * attribute(key)=value (string): one or more attributes that have to match the archive attribute.
   *  Attributes are passed by passing the key as an argument to the attribute() parameter and the value as parameter value.
   */
  attribute?: AttributeQueryParameter;
}

export interface LocationsFilter extends BaseFilter {
  filterId: string;
  showAttributes: boolean;
  includeLocationRelations?: boolean;
  includeTimeDependency?: boolean;
}

export interface ArchiveLocationsFilter extends BaseFilter {
  /**
   * Subset of locations for which to retrieve parameters.
   * This parameter has to be duplicated to specify multiple locations.
   */
  parameterIds?: string | string[];
  /**
   * attribute(key)=value (string): one or more attributes that have to match the archive attribute.
   *  Attributes are passed by passing the key as an argument to the attribute() parameter and the value as parameter value.
   */
  attribute?: AttributeQueryParameter;
}

export interface AttributesFilter extends BaseFilter {
  /**
   * Subset of archive attribute keys.
   * Only attributes with this key will be returned.
   * This parameter has to be duplicated to specify multiple attributes.
   * This parameter is useful to get all values for a specific attribute.
   */
  attributes?: string | string[];
  /**
   * Subset of locations for which to retrieve parameters.
   * This parameter has to be duplicated to specify multiple locations.
   */
  locationIds?: string | string[];
  /**
   * Subset of locations for which to retrieve parameters.
   * This parameter has to be duplicated to specify multiple locations.
   */
  parameterIds?: string | string[];
  /**
   * attribute(key)=value (string): one or more attributes that have to match the archive attribute.
   *  Attributes are passed by passing the key as an argument to the attribute() parameter and the value as parameter value.
   */
  attribute?: AttributeQueryParameter;
}

export interface ExternalForecastsFilter extends BaseFilter {
  /**
   * attribute(key)=value (string): one or more attributes that have to match the archive attribute.
   * Attributes are passed by passing the key as an argument to the attribute() parameter and the value as parameter value.
   */
  attribute?: AttributeQueryParameter;
  /**
   * (dateTime: yyyy-MM-ddTHH:mm:ssZ): Start time of search period that looks for time series values that lie within this period.
   */
  startTime?: string;
  /**
   * (dateTime: yyyy-MM-ddTHH:mm:ssZ): End time of search period that looks for time series values that lie within this period.
   */
  endTime?: string;
  /**
   * The maximum number of forecasts to be returned from archive.
   * If you only want to download the most recent forecast in the requested period then use forecastCount=1
   */
  forcastCount?: number;
  /**
   * The attributes of the forecast which should be included in the response. Repeat the parameter to specify multiple attributes.
   */
  requestedAttributes?: string | string[];
}

export enum TimeSeriesType {
  EXTERNAL_HISTORICAL = 'EXTERNAL_HISTORICAL',
  EXTERNAL_FORECASTING = 'EXTERNAL_FORECASTING',
  SIMULATED_HISTORICAL = 'SIMULATED_HISTORICAL',
  SIMULATED_FORECASTING = 'SIMULATED_FORECASTING',
}

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
}

export interface TimeSeriesGridFilter extends BaseTimeSeriesFilter {
  // (string, required): bounding box of map that is viewed in , separated EPSG:3857 format. The order of the coordinates is as follows: bottom left X, bottom left Y, top right X, top right Y. For example:
  // bbox=-1558755.612890017,4979850.04379049,1623657.8112034467,6709422.556884765
  bbox?: number[];
  // (boolean): Convert values from relative location height to absolute height values.
  convertDatum?: boolean;
  // (double): used for 3d data, like for example water depth, to get the timeseries of a grid point at a specific elevation. Since 2020.01.
  elevation?: number;
  // (dateTime format: yyyy-MM-ddTHH:mm:ssZ): Time value of external forecast time.
  externalForecastTime?: string;
  // (String): Used in combination with ensembleMemberId to identify a unique ensemble. Since 2020.01.
  ensembleId?: string;
  // (String): Used in combination with ensembleId to identify a unique ensemble. Since 2020.01.
  ensembleMemberId?: string;
  // (string, required): layerd id (only one layer is supported and required) that matches the gridPlot id as configured in the gridDisplay. Every gridPlot that has been configured in the grid display configuration represents a WMS layer. For more information, see the WMS Service documentation: FEWS Web Mapping Service with time support (WMS-T)
  layers?: string;
  // (boolean): Show vertical profile in case of 3D data. Since 2020.01.
  showVerticalProfile?: boolean;
  // (double, required): x postion on the map in EPSG:3857 format.
  x?: number;
  // (double, required): y postion on the map in EPSG:3857 format.
  y?: number;
}
