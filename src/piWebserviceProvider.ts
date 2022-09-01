import {
    AttributesResponse,
    ExternalForecastsResponse,
    LocationsResponse,
    ModuleRuntimesResponse,
    ParametersResponse, ScheduledTasksResponse,
    TaskRunsResponse,
    TimeSeriesResponse
} from './response'
import PiRestService from "./restservice/piRestService";
import {
    ArchiveLocationsFilter,
    AttributesFilter,
    DocumentFormat,
    ExternalForecastsFilter,
    ModuleRuntimesFilter,
    ParametersFilter,
    TaskRunsFilter,
    ScheduledTasksFilter,
    TimeSeriesFilter,
    TimeSeriesGridFilter,
    LocationsFilter
} from "../src/requestParameters";
import {absoluteUrl, filterToParams, splitUrl} from "./utils";

const attributesForKey: { [key: string]: string } = {
    parameterIds: 'long_name',
}

const MAX_URL_LENGTH = 1000

export class PiWebserviceProvider {
    baseUrl: URL
    maxUrlLength?: number
    readonly API_ENDPOINT = 'rest/fewspiservice/v1';
    webservice: PiRestService;

    /**
     * Constructor for PiWebserviceProvider
     *
     * @param url the base url where the PI servive is available
     */
    constructor(url: string, maxUrlLength?: number) {
        if (!url.endsWith("/")) {
            url += "/"
        }
        this.baseUrl = absoluteUrl(url)
        this.maxUrlLength = maxUrlLength;
        this.webservice = new PiRestService(url);
    }

    /**
     * Request parameters
     *
     * @param filter an object with request query parameters
     * @returns Parameters PI API response
     */
    async getParameters(filter: ParametersFilter): Promise<ParametersResponse> {
        const queryParameters = filterToParams(filter);
        const url = this.parametersUrl(queryParameters);
        const res = await this.webservice.getData<ParametersResponse>(url.toString());
        return res.data;
    }

    /**
     * Request locations from archive
     *
     * @param filter an object with request query parameters
     * @returns Locations PI API response
     */
    async getLocations(filter: LocationsFilter): Promise<LocationsResponse> {
        const queryParameters = filterToParams(filter);
        const url = this.locationsUrl(queryParameters, false);
        const res = await this.webservice.getData<LocationsResponse>(url.toString());
        return res.data;
    }

    /**
     * Request locations from archive
     *
     * @param filter an object with request query parameters
     * @returns Locations PI API response
     */
    async getArchiveLocations(filter: ArchiveLocationsFilter): Promise<LocationsResponse> {
        const queryParameters = filterToParams(filter);
        const url = this.locationsUrl(queryParameters, true);
        const res = await this.webservice.getData<LocationsResponse>(url.toString());
        return res.data;
    }

    /**
     * Request attributes
     *
     * @param filter an object with request query parameters
     * @returns Attributes PI API response
     */
    async getAttributes(filter: AttributesFilter): Promise<AttributesResponse> {
        const queryParameters = filterToParams(filter);
        const url = this.attributesUrl(queryParameters);
        const res = await this.webservice.getData<AttributesResponse>(url.toString());
        return res.data;
    }

    /**
     * Request external forecasts
     *
     * @param filter an object with request query parameters
     * @returns External Forecasts PI API response
     */
    async getExternalForecasts(filter: ExternalForecastsFilter): Promise<ExternalForecastsResponse> {
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
        const filterWithDefaults = {...mappedFilter, ...defaults}
        const queryParameters = filterToParams(filterWithDefaults)
        const url = this.externalForecastsUrl(queryParameters)
        const res = await this.webservice.getData<ExternalForecastsResponse>(url.toString());
        return res.data;
    }


    /**
     * Request Time Series
     *
     * @param filter an object with request query parameters
     * @returns Time Series PI API response
     */
    async getTimeSeries(filter: TimeSeriesFilter): Promise<TimeSeriesResponse> {
        const defaults: TimeSeriesFilter = {
            documentFormat: DocumentFormat.PI_JSON,
        }
        const filterWithDefaults = {...defaults, ...filter};
        const queryParameters = filterToParams(filterWithDefaults);
        const url = this.timeSeriesUrl(queryParameters);
        if (url.toString().length <= MAX_URL_LENGTH) {
            const res = await this.webservice.getData<TimeSeriesResponse>(url.toString());
            return res.data;
        } else {
            const urls = splitUrl(url, this.maxUrlLength);
            const promises = urls.map((u) => this.webservice.getData<TimeSeriesResponse>(url.toString()));
            return Promise.all(promises).then((responses) => {
                const response = responses[0].data;
                if (response.timeSeries !== undefined) {
                    for (let i = 1; i < responses.length; i++) {
                        if (responses[i].data.timeSeries === undefined) continue
                        response.timeSeries.push(...responses[i].data.timeSeries)
                    }
                }
                return response;
            })
        }
    }

    /**
     * Request Time Series Grid
     *
     * @param filter an object with request query parameters
     * @returns Time Series Grid PI API response
     */
    async getTimeSeriesGrid(filter: TimeSeriesGridFilter): Promise<TimeSeriesResponse> {
        const defaults: TimeSeriesGridFilter = {
            documentFormat: DocumentFormat.PI_JSON,
        }
        const filterWithDefaults = {...defaults, ...filter};
        const queryParameters = filterToParams(filterWithDefaults);
        const url = this.timeSeriesGridUrl(queryParameters);
        const res = await this.webservice.getData<TimeSeriesResponse>(url.toString());
        return res.data;
    }

    /**
     * Request scheduled tasks
     *
     * @param filter an object with request query parameters
     * @returns Time Series Grid PI API response
     */
    async getScheduledTasks(filter: ScheduledTasksFilter): Promise<ScheduledTasksResponse> {
        const defaults: Partial<ScheduledTasksFilter> = {}
        const filterWithDefaults = {...defaults, ...filter}
        const queryParameters = filterToParams(filterWithDefaults)
        const url = this.scheduledTasksUrl(queryParameters)
        const res = await this.webservice.getData<ScheduledTasksResponse>(url.toString());
        return res.data;
    }

    /**
     * Request scheduled tasks
     *
     * @param filter an object with request query parameters
     * @returns Time Series Grid PI API response
     */
    async getTaskRuns(filter: TaskRunsFilter): Promise<TaskRunsResponse> {
        const defaults: Partial<TaskRunsFilter> = {}
        const filterWithDefaults = {...defaults, ...filter}
        let queryParameters = filterToParams(filterWithDefaults)
        queryParameters = queryParameters + "&documentFormat=PI_JSON"
        const url = this.taskRunsUrl(queryParameters)
        const res = await this.webservice.getData<TaskRunsResponse>(url.toString());
        return res.data;
    }

    /**
     * Request scheduled tasks
     *
     * @param filter an object with request query parameters
     * @returns Time Series Grid PI API response
     */
    async getModuleRuntimes(filter: ModuleRuntimesFilter): Promise<ModuleRuntimesResponse> {
        const defaults: Partial<ModuleRuntimesFilter> = {}
        const filterWithDefaults = {...defaults, ...filter}
        const queryParameters = filterToParams(filterWithDefaults)
        const url = this.moduleRunTimesUrl(queryParameters)
        const res = await this.webservice.getData<ModuleRuntimesResponse>(url.toString());
        return res.data;
    }

    /**
     * Construct URL for locations request
     *
     * @param queryParameters query string
     * @param useArchive whether to use the archive or not
     * @returns complete url for making a request
     */
    locationsUrl(queryParameters: string, useArchive: boolean): URL {
        const path = useArchive ? 'archive/locations' : 'locations';
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/${path}${queryParameters}`,
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
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/timeseries${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Construct URL for time series grid request
     *
     * @param queryParameters query string
     * @returns complete url for making a request
     */
    timeSeriesGridUrl(queryParameters: string): URL {
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/timeseries/grid${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Construct URL for scheduled tasks request
     *
     * @param queryParameters query string
     * @returns complete url for making a request
     */
    scheduledTasksUrl(queryParameters: string): URL {
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/tasks/scheduled${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Construct URL for module run times request
     *
     * @param queryParameters query string
     * @returns complete url for making a request
     */
    moduleRunTimesUrl(queryParameters: string): URL {
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/tasks/moduleruntimes${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Construct URL for module run times request
     *
     * @param queryParameters query string
     * @returns complete url for making a request
     */
    taskRunsUrl(queryParameters: string): URL {
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/taskruns${queryParameters}`,
            this.baseUrl
        )
    }
}