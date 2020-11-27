export enum DocumentFormat {
  PI_XML = 'PI_XML',
  PI_JSON = 'PI_JSON',
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
  'attribute(period)'?: string;
}

export interface LocationsFilter extends BaseFilter {
  /**
   * Subset of locations for which to retrieve parameters.
   * This parameter has to be duplicated to specify multiple locations.
   */
  parameterIds?: string | string[];
  /**
   * attribute(key)=value (string): one or more attributes that have to match the archive attribute.
   *  Attributes are passed by passing the key as an argument to the attribute() parameter and the value as parameter value.
   */
  'attribute(period)'?: string;
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
  'attribute(period)'?: string;
}

export interface ExternalForecastsFilter extends BaseFilter {
  /**
   * attribute(key)=value (string): one or more attributes that have to match the archive attribute.
   * Attributes are passed by passing the key as an argument to the attribute() parameter and the value as parameter value.
   */
  'attribute(period)'?: string | string[];
  'attribute(long_name)'?: string | string[];
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

export interface TimeSeriesFilter extends BaseFilter {
  // (dateTime: yyyy-MM-ddTHH:mm:ssZ): End time of search period that looks for creation time of time series. Note: creation time of time series is actually the creation time of the task that produced/imported these time series.
  endCreationTime?: string;
  // (dateTime: yyyy-MM-ddTHH:mm:ssZ): End time of search period that looks for time series produced by forecasts that have their forecast time within this period.
  endForecastTime?: string;
  // (dateTime: yyyy-MM-ddTHH:mm:ssZ): End time of search period that looks for time series values that lie within this period.
  endTime?: string;
  // (dateTime format: yyyy-MM-ddTHH:mm:ssZ): Time value of external forecast time. This parameter has to be duplicated to specify multiple multiple externalForecastTimes.
  externalForecastTimes?: string | string[];
  // Number of forecast runs to return when using start- and end- forecast time. Default is 1.
  forecastCount?: number;
  // (string): Subset of locations for which to retrieve time series. This parameter can be duplicated to use multiple locationIds.
  locationIds?: string | string[];
  // (string): Subset of moduleInstances for which to retrieve time series. This parameter can be duplicated to specify multiple moduleInstanceIds.
  moduleInstanceIds?: string | string[];
  // (string): Subset of parameters for which to retrieve time series. This parameter has to be duplicated to specify multiple parameters.
  parameterIds?: string | string[];
  // (string): Subset of qualifiers for which to retrieve time series. This parameter has to be duplicated to specify multiple qualifierIds.
  'qualifierIds=period'?: string | string[];
  // (string): Explicitly filter on a specific time series type. (Since 2020.01).
  timeSeriesType?: TimeSeriesType;
  // (dateTime format: yyyy-MM-ddTHH:mm:ssZ): Start time of search period that looks for creation time of time series. Note: creation time of time series is actually the creation time of the task that produced/imported these time series.
  startCreationTime?: string;
  // (dateTime: yyyy-MM-ddTHH:mm:ssZ): Start time of search period that looks for time series produced by forecasts that have their forecast time within this period.
  startForecastTime?: string;
  // (dateTime: yyyy-MM-ddTHH:mm:ssZ): Start time of search period that looks for time series values that lie within this period.
  startTime?: string;
  // (boolean, default true): import data from external data source (Archive). (since 2017.02)
  importFromExternalDataSource?: boolean;
}
