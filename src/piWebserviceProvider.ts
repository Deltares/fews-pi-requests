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
} from "./requestParameters";
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
        const url = this.parametersUrl(filter);
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
        const url = this.locationsUrl(filter, false);
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
        const url = this.locationsUrl(filter, true);
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
        const url = this.attributesUrl(filter);
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
        const url = this.externalForecastsUrl(filterWithDefaults)
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
        const url = this.timeSeriesUrl(filterWithDefaults);
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
        const url = this.timeSeriesGridUrl(filterWithDefaults);
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
        const url = this.scheduledTasksUrl(filterWithDefaults)
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
        const url = this.taskRunsUrl(filterWithDefaults)
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
        const url = this.moduleRunTimesUrl(filterWithDefaults)
        const res = await this.webservice.getData<ModuleRuntimesResponse>(url.toString());
        return res.data;
    }

    /**
     * Construct URL for locations request
     *
     * @param filter an object with request query parameters
     * @param useArchive whether to use the archive or not
     * @returns complete url for making a request
     */
    locationsUrl(filter: LocationsFilter | ArchiveLocationsFilter, useArchive: boolean): URL {
        const path = useArchive ? 'archive/locations' : 'locations';
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/${path}${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Construct URL for parameters request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    parametersUrl(filter: ParametersFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/parameters${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Construct URL for attribute request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    attributesUrl(filter: AttributesFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/attributes${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Construct URL for external forecast request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    externalForecastsUrl(filter: ExternalForecastsFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/netcdfstorageforecasts${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Construct URL for time series request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    timeSeriesUrl(filter: TimeSeriesFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/timeseries${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Construct URL for time series grid request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    timeSeriesGridUrl(filter: TimeSeriesGridFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/timeseries/grid${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Construct URL for scheduled tasks request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    scheduledTasksUrl(filter: ScheduledTasksFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/tasks/scheduled${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Construct URL for module run times request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    moduleRunTimesUrl(filter: ModuleRuntimesFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/tasks/moduleruntimes${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Construct URL for module run times request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    taskRunsUrl(filter: TaskRunsFilter): URL {
        let queryParameters = filterToParams(filter)
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/taskruns${queryParameters}`,
            this.baseUrl
        )
    }
}
