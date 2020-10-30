import {
  ParametersFilter,
  LocationsFilter,
  AttributesFilter,
  TimeSeriesFilter,
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

const attributesForKey: { [key: string]: any } = {
  parameterIds: 'long_name',
}

export class PiWebserviceProvider {
  baseUrl: URL
  readonly API_ENDPOINT = '/FewsWebServices/rest/fewspiservice/v1'

  constructor(url: string) {
    this.baseUrl = new URL('', url)
  }

  getParameters(filter: ParametersFilter): Promise<ParametersResponse> {
    const queryParameters = filterToParams(filter)
    const url = this.parametersUrl(queryParameters)
    const promise = requestJson(url)
    return promise as Promise<ParametersResponse>
  }

  getLocations(filter: LocationsFilter): Promise<LocationsResponse> {
    const queryParameters = filterToParams(filter)
    const url = this.locationsUrl(queryParameters)
    const promise = requestJson(url)
    return promise as Promise<LocationsResponse>
  }

  getAttributes(filter: AttributesFilter): Promise<AttributesResponse> {
    const queryParameters = filterToParams(filter)
    const url = this.attributesUrl(queryParameters)
    const promise = requestJson(url)
    return promise as Promise<AttributesResponse>
  }

  getExternalForecasts(
    filter: ExternalForecastsFilter
  ): Promise<ExternalForecastsResponse> {
    const mappedFilter: { [key: string]: any } = {}
    for (const [key, value] of Object.entries(filter)) {
      if (key in Object.keys(attributesForKey)) {
        mappedFilter[attributesForKey[key]] = value
      } else {
        mappedFilter[key] = value
      }
    }
    const defaults: any = {
      documentFormat: DocumentFormat.PI_JSON,
      startTime: '1970-01-01T00:00:00Z',
      endTime: '2021-01-01T00:00:00Z',
      requestedAttribute: 'source_id',
    }
    const filterWithDefaults = { ...mappedFilter, ...defaults }
    const queryParameters = filterToParams(filterWithDefaults)
    const url = this.externalForecastsUrl(queryParameters)
    const promise = requestJson(url)
    return promise as Promise<ExternalForecastsResponse>
  }

  getTimeSeries(filter: TimeSeriesFilter): Promise<TimeSeriesResponse> {
    const defaults: any = {
      documentFormat: DocumentFormat.PI_JSON,
      forecastCount: 1,
      importFromExternalDataSource: true,
      timeSeriesType: 'EXTERNAL_FORECASTING',
      moduleInstanceIds: 'dcsm6zuno4_hirlam',
    }
    const filterWithDefaults = { ...defaults, ...filter }
    filterWithDefaults.startForecastTime = filterWithDefaults.startForecastTime.replace(
      '+0000',
      'Z'
    )
    filterWithDefaults.endForecastTime = filterWithDefaults.endForecastTime.replace(
      '+0000',
      'Z'
    )
    const queryParameters = filterToParams(filterWithDefaults)
    const url = this.timeSeriesUrl(queryParameters)
    const promise = requestJson(url)
    return promise as Promise<TimeSeriesResponse>
  }

  locationsUrl(queryParameters: string): URL {
    return new URL(
      `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/locations${queryParameters}`,
      this.baseUrl
    )
  }

  parametersUrl(queryParameters: string): URL {
    return new URL(
      `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/parameters${queryParameters}`,
      this.baseUrl
    )
  }

  attributesUrl(queryParameters: string): URL {
    return new URL(
      `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/attributes${queryParameters}`,
      this.baseUrl
    )
  }

  externalForecastsUrl(queryParameters: string): URL {
    return new URL(
      `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/netcdfstorageforecasts${queryParameters}`,
      this.baseUrl
    )
  }

  timeSeriesUrl(queryParameters: string): URL {
    const url = new URL(
      `${this.baseUrl.pathname}${this.API_ENDPOINT}/timeseries${queryParameters}`,
      this.baseUrl
    )
    return url
  }
}
