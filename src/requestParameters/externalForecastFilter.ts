import BaseFilter from "@/requestParameters/baseFilter";
import {AttributeQueryParameter} from "@/requestParameters/attributeQueryParameter";

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
