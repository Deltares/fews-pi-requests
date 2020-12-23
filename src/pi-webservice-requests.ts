import {
  ParametersFilter,
  LocationsFilter,
  AttributesFilter,
  TimeSeriesFilter,
  TimeSeriesGridFilter,
  ExternalForecastsFilter,
  DocumentFormat,
} from './interfaces/filters'
import {
  ParametersResponse,
  LocationsResponse,
  AttributesResponse,
  TimeSeriesResponse,
  ExternalForecastsResponse,
} from './interfaces/response'
import { requestJson } from './utils/requests'
import { filterToParams } from './utils/filter'

const attributesForKey: { [key: string]: string } = {
  parameterIds: 'long_name',
}

export class PiWebserviceProvider {
  baseUrl: URL
  readonly API_ENDPOINT = '/FewsWebServices/rest/fewspiservice/v1'

/**
 * Constructor for PiWebserviceProvider
 *
 * @param url the base url where the PI servive is available
 */
  constructor(url: string) {
    this.baseUrl = new URL('', url)
  }


/**
 * Request parameters
 *
 * @param filter an object with request query parameters
 * @returns Parameters PI API response
 */
  getParameters(filter: ParametersFilter): Promise<ParametersResponse> {
    const queryParameters = filterToParams(filter)
    const url = this.parametersUrl(queryParameters)
    const promise = requestJson(url)
    return promise as Promise<ParametersResponse>
  }

  /**
 * Request locations
 *
 * @param filter an object with request query parameters
 * @returns Locations PI API response
 */
  getLocations(filter: LocationsFilter): Promise<LocationsResponse> {
    const queryParameters = filterToParams(filter)
    const url = this.locationsUrl(queryParameters)
    const promise = requestJson(url)
    return promise as Promise<LocationsResponse>
  }

  /**
 * Request attributes
 *
 * @param filter an object with request query parameters
 * @returns Attributes PI API response
 */
  getAttributes(filter: AttributesFilter): Promise<AttributesResponse> {
    const queryParameters = filterToParams(filter)
    const url = this.attributesUrl(queryParameters)
    const promise = requestJson(url)
    return promise as Promise<AttributesResponse>
  }

  /**
 * Request external forecasts
 *
 * @param filter an object with request query parameters
 * @returns External Forecasts PI API response
 */
  getExternalForecasts(
    filter: ExternalForecastsFilter
  ): Promise<ExternalForecastsResponse> {
    const mappedFilter: { [key: string]: unknown } = {}
    for (const [key, value] of Object.entries(filter)) {
      if (key in Object.keys(attributesForKey)) {
        mappedFilter[attributesForKey[key]] = value
      } else {
        mappedFilter[key] = value
      }
    }
    const defaults: ExternalForecastsFilter = {
      documentFormat: DocumentFormat.PI_JSON,
    }
    const filterWithDefaults = { ...mappedFilter, ...defaults }
    const queryParameters = filterToParams(filterWithDefaults)
    const url = this.externalForecastsUrl(queryParameters)
    const promise = requestJson(url)
    return promise as Promise<ExternalForecastsResponse>
  }


/**
 * Request Time Series
 *
 * @param filter an object with request query parameters
 * @returns Time Series PI API response
 */
  getTimeSeries(filter: TimeSeriesFilter): Promise<TimeSeriesResponse> {
    const defaults: TimeSeriesFilter = {
      documentFormat: DocumentFormat.PI_JSON,
    }
    const filterWithDefaults = { ...defaults, ...filter }
    const queryParameters = filterToParams(filterWithDefaults)
    const url = this.timeSeriesUrl(queryParameters)
    const promise = requestJson(url)
    return promise as Promise<TimeSeriesResponse>
  }

/**
 * Request Time Series Grid
 *
 * @param filter an object with request query parameters
 * @returns Time Series Grid PI API response
 */
getTimeSeriesGrid(filter: TimeSeriesGridFilter): Promise<TimeSeriesResponse> {
  const defaults: TimeSeriesGridFilter = {
    documentFormat: DocumentFormat.PI_JSON,
  }
  const filterWithDefaults = { ...defaults, ...filter }
  const queryParameters = filterToParams(filterWithDefaults)
  const url = this.timeSeriesGridUrl(queryParameters)
  const promise = requestJson(url)
  return promise as Promise<TimeSeriesResponse>
}

/**
 * Construct URL for locations request
 *
 * @param queryParameters query string
 * @returns complete url for making a request
 */
  locationsUrl(queryParameters: string): URL {
    return new URL(
      `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/locations${queryParameters}`,
      this.baseUrl
    )
  }

/**
 * Construct URL for parameters request
 *
 * @param queryParameters query string
 * @returns complete url for making a request
 */
  parametersUrl(queryParameters: string): URL {
    return new URL(
      `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/parameters${queryParameters}`,
      this.baseUrl
    )
  }

/**
 * Construct URL for attribute request
 *
 * @param queryParameters query string
 * @returns complete url for making a request
 */
  attributesUrl(queryParameters: string): URL {
    return new URL(
      `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/attributes${queryParameters}`,
      this.baseUrl
    )
  }

/**
 * Construct URL for external forecast request
 *
 * @param queryParameters query string
 * @returns complete url for making a request
 */
  externalForecastsUrl(queryParameters: string): URL {
    return new URL(
      `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/netcdfstorageforecasts${queryParameters}`,
      this.baseUrl
    )
  }

/**
 * Construct URL for time series request
 *
 * @param queryParameters query string
 * @returns complete url for making a request
 */
  timeSeriesUrl(queryParameters: string): URL {
    const url = new URL(
      `${this.baseUrl.pathname}${this.API_ENDPOINT}/timeseries${queryParameters}`,
      this.baseUrl
    )
    return url
  }

/**
 * Construct URL for time series grid request
 *
 * @param queryParameters query string
 * @returns complete url for making a request
 */
  timeSeriesGridUrl(queryParameters: string): URL {
    const url = new URL(
      `${this.baseUrl.pathname}${this.API_ENDPOINT}/timeseries/grid${queryParameters}`,
      this.baseUrl
    )
    return url
  }
}
