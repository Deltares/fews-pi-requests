/*tslint:disable*/

/**
 * ArchiveExternalNetCDFStorageForecastsResponse PI_JSON
 */
export interface ArchiveExternalNetCDFStorageForecasts {
  /**
   * External NetCD FStorage Forecasts
   */
  externalNetCDFStorageForecasts: ExternalNetCDFStorageForecast[];
}
export interface ExternalNetCDFStorageForecast {
  forecastTime: string;
  forecastAvailableTime: string;
  /**
   * External NetCD FStorage Forecasts Attributes
   */
  attributes?: ExternalNetCDFStorageForecastAttribute[];
}
export interface ExternalNetCDFStorageForecastAttribute {
  name: string;
  value: string;
}
