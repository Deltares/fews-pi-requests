import {
    LocationsResponse,
    TaskRunsResponse,
    ImportStatusResponse,
    VersionResponse,
    TimeSeriesResponse
} from './response'
import PiRestService from "./restservice/piRestService";
import {
    DocumentFormat,
    TaskRunsFilter,
    TimeSeriesFilter,
    TimeSeriesGridFilter,
    LocationsFilter
} from "./requestParameters";
import {absoluteUrl, filterToParams, splitUrl} from "./utils";
import {TopologyNodeResponse} from "./response";
import {DisplayGroupsFilter} from "./requestParameters/DisplayGroupsFilter";
import {DisplayGroupsResponse} from "./response/displaygroups/displayGroupsResponse";

export class PiWebserviceProvider {
    baseUrl: URL
    maxUrlLength: number
    readonly API_ENDPOINT = 'rest/fewspiservice/v1';
    webservice: PiRestService;

    /**
     * Constructor for PiWebserviceProvider
     *
     * @param url the base url where the PI servive is available
     * @param maxUrlLength if the length of the url is larger than specified, the requests will be split up.
     */
    constructor(url: string, maxUrlLength?: number) {
        if (!url.endsWith("/")) {
            url += "/"
        }
        this.baseUrl = absoluteUrl(url)
        this.maxUrlLength = maxUrlLength ?? Infinity;
        this.webservice = new PiRestService(url);
        //todo check version.
    }

    /**
     * Request locations
     *
     * @param filter an object with request query parameters
     * @returns Locations PI API response
     */
    async getLocations(filter: LocationsFilter): Promise<LocationsResponse> {
        const queryParameters = filterToParams(filter);
        const url = this.locationsUrl(queryParameters);
        const res = await this.webservice.getData<LocationsResponse>(url.toString());
        return res.data;
    }

    /**
     * Request time series with a relative url
     * @param relativeUrl
     * @returns time series api response
     */
    async getTimeSeriesWithRelativeUrl(relativeUrl: string): Promise<TimeSeriesResponse> {
        const requestInit = {} as RequestInit;
        requestInit.cache = "no-cache";
        const url = new URL(relativeUrl, this.baseUrl);
        const res = await this.webservice.getDataWithRequestInit<TimeSeriesResponse>(url.toString(), requestInit);
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
        if (url.toString().length <= this.maxUrlLength) {
            const res = await this.webservice.getData<TimeSeriesResponse>(url.toString());
            return res.data;
        } else {
            const urls = splitUrl(url, this.maxUrlLength);
            const promises = urls.map((u) => this.webservice.getData<TimeSeriesResponse>(u.toString()));
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
     * @returns task runs PI API response
     */
    async getTaskRuns(filter: TaskRunsFilter): Promise<TaskRunsResponse> {
        const defaults: Partial<TaskRunsFilter> = {}
        const filterWithDefaults = {...defaults, ...filter}
        const queryParameters = filterToParams(filterWithDefaults)
        const url = this.taskRunsUrl(queryParameters);
        const requestInit = {} as RequestInit;
        requestInit.cache = "no-cache";
        const res = await this.webservice.getDataWithRequestInit<TaskRunsResponse>(url.toString(), requestInit);
        return res.data;
    }


    /**
     * Get all the topology nodes of FEWS
     *
     * @returns all the topology nodes configured in FEWS
     */
    async getTopologyNodes(): Promise<TopologyNodeResponse> {
        const url = this.topologyNodesUrl();
        const res = await this.webservice.getData<TopologyNodeResponse>(url.toString());
        return res.data;
    }

    /**
     * Get the import status of FEWS
     *
     * @returns import status API response
     */
    async getImportStatus(): Promise<ImportStatusResponse> {
        const queryParameters = "documentFormat=PI_JSON"
        const url = this.importStatusUrl(queryParameters);
        const requestInit = {} as RequestInit;
        requestInit.cache = "no-cache";
        const res = await this.webservice.getDataWithRequestInit<ImportStatusResponse>(url.toString(), requestInit);
        return res.data;
    }

    /**
     * Get the import status of FEWS
     *
     * @returns import status API response
     */
    async getVersion(): Promise<VersionResponse> {
        const queryParameters = "documentFormat=PI_JSON"
        const url = this.versionUrl(queryParameters);
        const requestInit = {} as RequestInit;
        requestInit.cache = "no-cache";
        const res = await this.webservice.getDataWithRequestInit<VersionResponse>(url.toString(), requestInit);
        return res.data;
    }

    /**
     * Get the time series info for a certain topology node
     *
     * @param filter search options for the displays (nodeId)
     * @returns Display groups API response
     */
    async getDisplayGroupsTimeSeriesInfo(filter: DisplayGroupsFilter): Promise<DisplayGroupsResponse> {
        const queryParameters = filterToParams(filter)
        const url = this.displayGroupsUrl(queryParameters)
        const res = await this.webservice.getData<DisplayGroupsResponse>(url.toString());
        return res.data;
    }


    /**
     * Construct URL for locations request
     *
     * @param queryParameters query string
     * @returns complete url for making a request
     */
    locationsUrl(queryParameters: string): URL {
        const path = 'locations';
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/${path}${queryParameters}`,
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
     * Construct URL for display groups request
     *
     * @param queryParameters query string
     * @returns complete url for making a request
     */
    displayGroupsUrl(queryParameters: string): URL {
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/displaygroups${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Construct URL for task runs request
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

    /**
     * Construct URL for import status request
     *
     * @param queryParameters query string
     * @returns complete url for making a request
     */
    importStatusUrl(queryParameters: string): URL {
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/import/status?${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Construct URL for version information
     *
     * @param queryParameters query string
     * @returns complete url for making a request
     */
    versionUrl(queryParameters: string): URL {
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/version?${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Construct URL for topology nodes request
     *
     * @returns complete url for making a request
     */
    topologyNodesUrl(): URL {
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/topology/nodes`,
            this.baseUrl
        )
    }
}
