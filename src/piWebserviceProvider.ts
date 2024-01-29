import type {TimeSeriesResponse} from './response/timeseries'
import type {TaskRunsResponse} from './response/tasks'
import type {LocationsResponse} from './response/locations'
import type {ImportStatusResponse} from './response/importStatus'
import type {VersionResponse} from './response/version'

import type {
    BaseFilter,
    TaskRunsFilter,
    TimeSeriesFilter,
    TimeSeriesGridFilter,
    LocationsFilter,
    ParametersFilter,
    ProcessDataFilter,
    timeSeriesGridActionsFilter,
    filterActionsFilter
} from "./requestParameters";
import type {TopologyNodeResponse} from "./response/topology";
import type {TopologyActionFilter} from "./requestParameters/topologyActionFilter";
import type {ActionsResponse} from "./response/actions/actionsResponse";
import type {DisplayGroupsNodesResponse} from "./response/displaygroups/DisplayGroupsNodesResponse";
import type {WebOcConfigurationResponse} from "./response/configuration/WebOcConfigurationResponse";
import type {TimeSeriesFlagsResponse} from "./response/flags/TimeSeriesFlagsResponse";
import type {TimeSeriesFlagSourcesResponse} from "./response/flags/TimeSeriesFlagSourcesResponse";
import type {TimeSeriesParametersResponse} from "./response/timeseriesparameters/timeSeriesParametersResponse";
import type {ParameterGroupsOutput} from "./output/parameters/parameterGroupsOutput";
import type { ParameterGroupsOutputOptions, ParameterOutputOptions } from './output/parameters/parameterOutputOptions'

import { convertToParameterGroups } from './output/parameters/convertToParameterGroups.js'
import {absoluteUrl, filterToParams, splitUrl} from "./utils/index.js";
import {DocumentFormat} from './requestParameters/index.js'
import {HistoryEditsFilter} from "@/requestParameters/historyEditsFilter";
import {HistoryEditsResponse} from "@/response/timeseries/historyEditsResponse";

import {PiRestService, PlainTextParser, RequestOptions} from "@deltares/fews-web-oc-utils";
import type {TransformRequestFunction} from "@deltares/fews-web-oc-utils";
import DataRequestResult from "@deltares/fews-web-oc-utils/lib/types/restservice/dataRequestResult";

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
     * Request the history of the edits
     *
     * @param filter an object with request query parameters
     * @returns Locations PI API response
     */
    async getHistoryEdits(filter: HistoryEditsFilter): Promise<HistoryEditsResponse> {
        let url = filter.editUrl;
        for (const time in filter.times) {
            url = url + "&times=" + filter.times[time];
        }
        const res = await this.webservice.getData<HistoryEditsResponse>(url);
        return res.data;
    }

    /**
     * Request parameters
     *
     * @param filter an object with request query parameters
     * @param output options to convert output
     * @returns Parmeters PI API response
     */
    async getParameters(filter: ParametersFilter): Promise<TimeSeriesParametersResponse>
    async getParameters(filter: ParametersFilter, output?: ParameterGroupsOutputOptions): Promise<ParameterGroupsOutput>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getParameters(filter: ParametersFilter, output?: ParameterOutputOptions): Promise<ParameterGroupsOutput|TimeSeriesParametersResponse> {
        const url = this.parametersUrl(filter);
        const res = await this.webservice.getData<TimeSeriesParametersResponse>(url.toString());
        if (output?.type === 'parameterGroups') {
            return convertToParameterGroups(res.data)
        }
        return res.data;
    }

    /**
     * Request time series with a relative url
     * @param relativeUrl
     * @returns time series api response
     */
    async getTimeSeriesWithRelativeUrl(relativeUrl: string): Promise<TimeSeriesResponse> {
        const url = new URL(relativeUrl, this._baseUrl);
        const res = await this.webservice.getData<TimeSeriesResponse>(url.toString());
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
     * Request Time Series Grid Actions
     *
     * @param filter an object with request query parameters
     * @returns Time Series Grid Actions PI API response
     */

    async getTimeSeriesGridActions(filter: timeSeriesGridActionsFilter): Promise<ActionsResponse> {
        const url = this.timeSeriesGridActionsUrl(filter)
        const res = await this.webservice.getData<ActionsResponse>(url.toString());
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
        const res = await this.webservice.getData<TaskRunsResponse>(url.toString());
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
        const res = await this.webservice.getData<ImportStatusResponse>(url.toString());
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
        const res = await this.webservice.getData<VersionResponse>(url.toString());
        return res.data;
    }

    /**
     * Get the configuration of FEWS related to the Web OC.
     *
     * @returns Web OC configuration API response
     */
    async getWebOcConfiguration(): Promise<WebOcConfigurationResponse> {
        const defaults: BaseFilter = {
            documentFormat: DocumentFormat.PI_JSON,
        }
        const url = this.webOcConfigurationUrl(defaults);
        const res = await this.webservice.getData<WebOcConfigurationResponse>(url.toString());
        return res.data;
    }

    /**
     * Get the configuration of FEWS related to the Web OC that is always available.
     *
     * @returns Web OC public configuration API response
     */
    async getWebOcPublicConfiguration(): Promise<WebOcConfigurationResponse> {
        const defaults: BaseFilter = {
            documentFormat: DocumentFormat.PI_JSON,
        }
        const url = this.webOcPublicConfigurationUrl(defaults);
        const res = await this.webservice.getData<WebOcConfigurationResponse>(url.toString());
        return res.data;
    }

    /**
     * Get the time series info for a certain topology node
     *
     * @param filter search options for the displays (nodeId)
     * @returns Display groups API response
     */
    async getTopologyActions(filter: TopologyActionFilter): Promise<ActionsResponse> {
        const url = this.topologyActionsUrl(filter)
        const res = await this.webservice.getData<ActionsResponse>(url.toString());
        return res.data;
    }

    async getDisplayGroupsNodes(): Promise<DisplayGroupsNodesResponse> {
        const url = this.displayGroupsNodesUrl()
        const res = await this.webservice.getData<DisplayGroupsNodesResponse>(url.toString());
        return res.data;
    }

    async getFlags(): Promise<TimeSeriesFlagsResponse> {
        const url = this.flagsUrl()
        const res = await this.webservice.getData<TimeSeriesFlagsResponse>(url.toString());
        return res.data;
    }

    async getFlagSources(): Promise<TimeSeriesFlagSourcesResponse> {
        const url = this.flagSourcesUrl()
        const res = await this.webservice.getData<TimeSeriesFlagSourcesResponse>(url.toString());
        return res.data;
    }

    async getFilterActions(filter: filterActionsFilter): Promise<ActionsResponse> {
        const url = this.filterActionsUrl(filter)
        const res = await this.webservice.getData<ActionsResponse>(url.toString());
        return res.data;
    }

    /**
     * Post time series edits.
     *
     */
    async postTimeSeriesEdit(editUrl: string, timeSeriesEvents: TimeSeriesResponse): Promise<unknown> {
        const requestOptions = new RequestOptions()
        requestOptions.relativeUrl = !editUrl.toString().startsWith("http")
        const headers = {
            'Content-Type': "application/json"
        }
        const res = await this.webservice.postDataWithParser<DataRequestResult<string>>(editUrl, requestOptions, new PlainTextParser(), JSON.stringify(timeSeriesEvents), headers);
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
     * Construct URL for history edits request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    historyEditsUrl(filter: HistoryEditsFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/timeseries/history/${queryParameters}`,
            this._baseUrl
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
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/parameters${queryParameters}`,
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
    topologyActionsUrl(filter: TopologyActionFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/topology/actions${queryParameters}`,
            this._baseUrl
        )
    }

    /**
     * Construct URL for time series grid actions request
     * @param filter an object with request query parameters
     * @returns 
     */
    timeSeriesGridActionsUrl(filter: timeSeriesGridActionsFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/timeseries/grid/actions${queryParameters}`,
            this._baseUrl
        )
    }

    /**
     * Construct URL for filter actions request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    filterActionsUrl(filter: filterActionsFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/filters/actions${queryParameters}`,
            this._baseUrl
        )
    }

    /**
     * Construct URL for display group nodes request
     *
     * @returns complete url for making a request
     */
    displayGroupsNodesUrl(): URL {
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/displaygroups/nodes`,
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
     * Construct URL for Web OC configuration
     *
     * @returns complete url for making a request
     */
    webOcConfigurationUrl(filter: BaseFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/weboc/config${queryParameters}`,
            this._baseUrl
        )
    }

    /**
     * Construct URL for Web OC configuration
     *
     * @returns complete url for making a request
     */
    webOcPublicConfigurationUrl(filter: BaseFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/weboc/config/public${queryParameters}`,
            this._baseUrl
        )
    }

    /**
     *
     * Construct URL for static resources from the Delft-FEWS WebResourceFiles configuration folder.
     * In case an absolute URL is passed, the passed path will be returned as URL.
     *
     * @returns complete url for making a request
     */
    resourcesStaticUrl(resource: string): URL {
        if (resource.startsWith("http://") || resource.startsWith("https://") ) return new URL(resource)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/resources/static/${resource}`,
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

    flagsUrl(): URL {
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/flags`,
            this._baseUrl
        )
    }

    flagSourcesUrl(): URL {
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/flagsources`,
            this._baseUrl
        )
    }

    processDataUrl(filter: ProcessDataFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/processdata${queryParameters}`,
            this._baseUrl
        )
    }

}
