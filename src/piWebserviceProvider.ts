import type {TimeSeriesResponse} from './response/timeseries'
import type {TaskRunsResponse} from './response/tasks'
import type {LocationsResponse} from './response/locations'
import type {ImportStatusResponse} from './response/importStatus'
import type {VersionResponse} from './response/version'

import type {
    TaskRunsFilter,
    TimeSeriesFilter,
    TimeSeriesGridFilter,
    LocationsFilter
} from "./requestParameters";
import type {TopologyNodeResponse} from "./response/topology";
import type {DisplayGroupsFilter} from "./requestParameters/DisplayGroupsFilter";
import type {DisplayGroupsResponse} from "./response/displaygroups/displayGroupsResponse";

import {absoluteUrl, filterToParams, splitUrl} from "./utils/index.js";
import {PiRestService} from "@deltares/fews-web-oc-utils";
import type {TransformRequestFunction} from "@deltares/fews-web-oc-utils";
import {DocumentFormat} from './requestParameters/index.js'

export class PiWebserviceProvider {
    private _baseUrl: URL
    maxUrlLength: number
    readonly API_ENDPOINT = 'rest/fewspiservice/v1';
    webservice: PiRestService;

    /**
     * Constructor for PiWebserviceProvider
     *
     * @param url the base url where the PI service is available
     * @param {Object} [options] Optional constructor options
     * @param {number} [options.maxUrlLength] A number that specifies the maximum length of the URL. If the URL length exceeds this value, the requests will be split up.
     * @param {TransformRequestFunction} [options.transformRequestFn] A function that can be used to modify the Request
     * before it is sent to the server. This function takes a Request as a parameter and returns the modified Request.
     * If this option is not specified, the Request will be sent as is.
     */
    constructor(url: string, options: {maxUrlLength?: number; transformRequestFn?: TransformRequestFunction} = {}) {
        if (!url.endsWith("/")) {
            url += "/"
        }
        this._baseUrl = absoluteUrl(url)
        this.maxUrlLength = options.maxUrlLength ?? Infinity;
        this.webservice = new PiRestService(url, options.transformRequestFn);

    }

    /**
     * Request locations
     *
     * @param filter an object with request query parameters
     * @returns Locations PI API response
     */
    async getLocations(filter: LocationsFilter): Promise<LocationsResponse> {
        const url = this.locationsUrl(filter);
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
        const url = new URL(relativeUrl, this._baseUrl);
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
        const url = this.timeSeriesUrl(filterWithDefaults);
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
                        response.timeSeries.push(...responses[i].data.timeSeries || [])
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
     * @returns task runs PI API response
     */
    async getTaskRuns(filter: TaskRunsFilter): Promise<TaskRunsResponse> {
        const defaults: Partial<TaskRunsFilter> = {}
        const filterWithDefaults = {...defaults, ...filter}
        const url = this.taskRunsUrl(filterWithDefaults);
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
        const url = this.importStatusUrl();
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
        const url = this.displayGroupsUrl(filter)
        const res = await this.webservice.getData<DisplayGroupsResponse>(url.toString());
        return res.data;
    }

    /**
     * Construct URL for locations request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    locationsUrl(filter: LocationsFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/locations${queryParameters}`,
            this._baseUrl
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
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/timeseries${queryParameters}`,
            this._baseUrl
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
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/timeseries/grid${queryParameters}`,
            this._baseUrl
        )
    }

    /**
     * Construct URL for display groups request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    displayGroupsUrl(filter: DisplayGroupsFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/displaygroups${queryParameters}`,
            this._baseUrl
        )
    }

    /**
     * Construct URL for module run times request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
     taskRunsUrl(filter: TaskRunsFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/taskruns${queryParameters}`,
            this._baseUrl
        )
    }

    /**
     * Construct URL for import status request
     *
     * @returns complete url for making a request
     */
    importStatusUrl(): URL {
        const queryParameters = "documentFormat=PI_JSON"
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/import/status?${queryParameters}`,
            this._baseUrl
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
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/version?${queryParameters}`,
            this._baseUrl
        )
    }

    /**
     * Construct URL for topology nodes request
     *
     * @returns complete url for making a request
     */
    topologyNodesUrl(): URL {
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/topology/nodes`,
            this._baseUrl
        )
    }
}
