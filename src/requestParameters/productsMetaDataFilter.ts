import type { AttributeQueryParameter } from "./attributeQueryParameter";

interface BaseProductsMetaDataFilter {
  /**
   * attribute(key)=value (string): one or more attributes that have to match the archive attribute.
   *  Attributes are passed by passing the key as an argument to the attribute() parameter and the value as parameter value.
   */
  attribute?: AttributeQueryParameter;
  // versionKey: List of attributes as keys that are part of the returned version
  versionKey?: string[];
  /** @description Number of products which should be returned. If no forecast count is used, all products in the search period will be returned. */
  forecastCount?: number;
  /** @description Supported Document Format: PI_JSON,  */
  documentFormat?: "PI_JSON";
  /** @description Document Version. Latest version is: 1.34 */
  documentVersion?: string;
}

interface ForecastTimeFilter extends BaseProductsMetaDataFilter {
    /** @description (dateTime: yyyy-MM-ddTHH:mm:ssZ): End time of search period that looks for time series produced by forecasts that have their forecast time within this period. */
    endForecastTime?: string;
    /** @description (dateTime: yyyy-MM-ddTHH:mm:ssZ): Start time of search period that looks for time series produced by forecasts that have their forecast time within this period. */
    startForecastTime?: string;
    startTime?: never;
    endTime?: never;
}

interface TimeFilter extends BaseProductsMetaDataFilter {
    /** @description (dateTime: yyyy-MM-ddTHH:mm:ssZ): Start time of search period that looks for products that have been edited in this period. */
    startTime?: string;
    /** @description (dateTime: yyyy-MM-ddTHH:mm:ssZ): End time of search period that looks for products that have been edited in this period. */
    endTime?: string;
    startForecastTime?: never;
    endForecastTime?: never;
}

export type ProductsMetaDataFilter = ForecastTimeFilter | TimeFilter;