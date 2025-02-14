import type {TimeSeriesResponse} from './response/timeseries'
import type {ModuleRuntimesResponse, TaskRunsResponse} from './response/tasks'
import type {LocationsResponse} from './response/locations'
import type {ImportStatusResponse} from './response/importStatus'
import type {VersionResponse} from './response/version'

import type {
    BaseFilter,
    TaskRunsFilter,
    TimeSeriesFilter,
    TimeSeriesGridFilter,
    LocationsFilter,
    LocationsTooltipFilter,
    ParametersFilter,
    ProcessDataFilter,
    ReportsFilter,
    RunTaskFilter,
    timeSeriesGridActionsFilter,
    TimeSeriesTopologyActionsFilter,
    filterActionsFilter,
    WorkflowsFilter,
    ModuleRuntimesFilter,
    LogDisplaysFilter,
    LogDisplayLogsFilter,
    DashboardsFilter,
    WhatIfScenariosFilter,
    WhatIfTemplatesFilter,
    PostWhatIfScenarioFilter,
    ComponentSettingsFilter,
    TimeSeriesGridMaxValuesFilter,
    HistoryEditsFilter,
    TopologyActionFilter,
} from "./requestParameters";
import { DocumentFormat } from "./requestParameters/index.js";
import type {
    ActionsResponse,
    DisplayGroupsNodesResponse,
    WebOcConfigurationResponse,
    TimeSeriesFlagsResponse,
    TimeSeriesFlagSourcesResponse,
    TimeSeriesParametersResponse,
    HistoryEditsResponse,
    TopologyThresholdNodeResponse,
    ReportsResponse,
    WorkflowResponse,
    LogsDisplayLogsResponse,
    LogsDisplaysResponse,
    WhatIfTemplatesResponse,
    WhatIfScenarioResponse,
    PostWhatIfScenarioResponse,
    WebOCDashboardsResponse,
    WebOCComponentSettingsResponse,
    TopologyNodeResponse,
} from "./response";

import { convertToParameterGroups } from './output/parameters/convertToParameterGroups.js'
import type { ParameterGroupsOutputOptions, ParameterOutputOptions } from './output/parameters/parameterOutputOptions'
import type { ParameterGroupsOutput } from './output/parameters/parameterGroupsOutput'
import {absoluteUrl, filterToParams, splitUrl} from "./utils/index.js";

import {DefaultParser, PiRestService, PlainTextParser, RequestOptions} from "@deltares/fews-web-oc-utils";
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
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getLocations(filter: LocationsFilter): Promise<LocationsResponse> {
        const url = this.locationsUrl(filter);
        const res = await this.webservice.getData<LocationsResponse>(url.toString());
        return res.data;
    }

    /**
     * Request log displays
     *
     * @returns Locations PI API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getLogDisplays(filter: LogDisplaysFilter): Promise<LogsDisplaysResponse> {
        const url = this.logDisplaysUrl(filter);
        const res = await this.webservice.getData<LogsDisplaysResponse>(url.toString());
        return res.data;
    }

    /**
     * Request locations
     *
     * @param filter an object with request query parameters
     * @returns LocationsTooltip API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getLocationsTooltip(filter: LocationsTooltipFilter): Promise<string> {
        const url = this.locationsTooltipUrl(filter).toString();
        const parser = new PlainTextParser<string>();
        const requestOptions = new RequestOptions();
        requestOptions.relativeUrl = !url.startsWith('http');
        const res = await this.webservice.getDataWithParser<string>(url, requestOptions, parser);
        return res.data;
    }

    /**
     * Request the history of the edits
     *
     * @param filter an object with request query parameters
     * @returns Locations PI API response
     * @throws 'Fetch Error' if fetch result is not ok
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
     * @throws 'Fetch Error' if fetch result is not ok
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
     * @throws 'Fetch Error' if fetch result is not ok
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
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getTimeSeriesTopologyActions(filter: TimeSeriesTopologyActionsFilter): Promise<TimeSeriesResponse> {
        const defaults: TimeSeriesFilter = {
            documentFormat: DocumentFormat.PI_JSON,
        }
        const filterWithDefaults = {...defaults, ...filter};
        const url = this.timeSeriesTopologyActionsUrl(filterWithDefaults);
        return await this.getTimeSeriesResponse(url);
    }

    /**
     * Request Time Series
     *
     * @param filter an object with request query parameters
     * @returns Time Series PI API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getTimeSeries(filter: TimeSeriesFilter): Promise<TimeSeriesResponse> {
        const defaults: TimeSeriesFilter = {
            documentFormat: DocumentFormat.PI_JSON,
        }
        const filterWithDefaults = {...defaults, ...filter};
        const url = this.timeSeriesUrl(filterWithDefaults);
        return await this.getTimeSeriesResponse(url);
    }

    private async getTimeSeriesResponse(url: URL) {
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
     * @throws 'Fetch Error' if fetch result is not ok
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
     * @throws 'Fetch Error' if fetch result is not ok
     */

    async getTimeSeriesGridActions(filter: timeSeriesGridActionsFilter): Promise<ActionsResponse> {
        const url = this.timeSeriesGridActionsUrl(filter)
        const res = await this.webservice.getData<ActionsResponse>(url.toString());
        return res.data;
    }

    /**
     * Request time series maximum values for a WMS layer.
     *
     * @param filter an object with request query parameters
     * @returns Time series with maximum values for a WMS layer.
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getTimeSeriesGridMaxValues(filter: TimeSeriesGridMaxValuesFilter): Promise<TimeSeriesResponse> {
        const url = this.timeSeriesGridMaxValuesUrl(filter);
        const res = await this.webservice.getData<TimeSeriesResponse>(url.toString());
        return res.data;
    }

    /**
     * Request scheduled tasks
     *
     * @param filter an object with request query parameters
     * @returns task runs PI API response
     * @throws 'Fetch Error' if fetch result is not ok
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
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getTopologyNodes(): Promise<TopologyNodeResponse> {
        const url = this.topologyNodesUrl();
        const res = await this.webservice.getData<TopologyNodeResponse>(url.toString());
        return res.data;
    }

    /**
     * Get all the active thresholds for the topology nodes 
     *
     * @returns all the active thresholds for the topology nodes
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getTopologyThresholds(): Promise<TopologyThresholdNodeResponse> {
        const url = this.topologyThresholdsUrl()
        const res = await this.webservice.getData<TopologyThresholdNodeResponse>(url.toString());
        return res.data;
    }

    /**
     * Get the import status of FEWS
     *
     * @returns import status API response
     * @throws 'Fetch Error' if fetch result is not ok
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
     * @throws 'Fetch Error' if fetch result is not ok
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
     * @throws 'Fetch Error' if fetch result is not ok
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
     * @throws 'Fetch Error' if fetch result is not ok
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
     * Get the actions for a certain topology node
     *
     * @param filter search options for the displays (nodeId)
     * @returns Display groups API response
     * @throws 'Fetch Error' if fetch result is not ok
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

    /**
     * Get the time series flags
     *
     * @returns Time series flags API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getFlags(): Promise<TimeSeriesFlagsResponse> {
        const url = this.flagsUrl()
        const res = await this.webservice.getData<TimeSeriesFlagsResponse>(url.toString());
        return res.data;
    }

    /**
     * Get the time series flag sources
     *
     * @returns Time series flag sources API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getFlagSources(): Promise<TimeSeriesFlagSourcesResponse> {
        const url = this.flagSourcesUrl()
        const res = await this.webservice.getData<TimeSeriesFlagSourcesResponse>(url.toString());
        return res.data;
    }

    /**
     * Get the actions for filter
     *
     * @param filter search options
     * @returns Actions API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getFilterActions(filter: filterActionsFilter): Promise<ActionsResponse> {
        const url = this.filterActionsUrl(filter)
        const res = await this.webservice.getData<ActionsResponse>(url.toString());
        return res.data;
    }


    /**
     * Get the workflows
     *
     * @param filter search options
     * @returns Workflows API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getWorkflows(filter: WorkflowsFilter): Promise<WorkflowResponse> {
        const url = this.workflowsUrl(filter)
        const res = await this.webservice.getData<WorkflowResponse>(url.toString());
        return res.data;
    }

    /**
     * Get the module run times
     *
     * @param filter search options
     * @returns Module run times API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getModuleRunTimes(filter: ModuleRuntimesFilter): Promise<ModuleRuntimesResponse> {
        const url = this.moduleRunTimesUrl(filter)
        const res = await this.webservice.getData<ModuleRuntimesResponse>(url.toString());
        return res.data;
    }

    /**
     * Get the dashboards
     *
     * @param filter search options
     * @returns Dashboards API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getDashboards(filter: DashboardsFilter): Promise<WebOCDashboardsResponse> {
        const url = this.dashboardsUrl(filter)
        const res = await this.webservice.getData<WebOCDashboardsResponse>(url.toString());
        return res.data;
    }

    /**
     * Get the logdisplay logs
     *
     * @param filter search options
     * @returns LogsDisplayLogsResponse API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getLogDisplayLogs(filter: LogDisplayLogsFilter): Promise<LogsDisplayLogsResponse> {
        const url = this.logDisplayLogsUrl(filter)
        const res = await this.webservice.getData<LogsDisplayLogsResponse>(url.toString());
        return res.data;
    }

    /**
     * Get the what if templates
     *
     * @param filter search options
     * @returns WhatIfTemplates API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getWhatIfTemplates(filter: WhatIfTemplatesFilter): Promise<WhatIfTemplatesResponse> {
        const url = this.whatIfTemplatesUrl(filter)
        const res = await this.webservice.getData<WhatIfTemplatesResponse>(url.toString());
        return res.data;
    }
    
    /**
     * Get the component settings
     *
     * @param filter search options
     * @returns ComponentSettings API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getComponentSettings(filter: ComponentSettingsFilter): Promise<WebOCComponentSettingsResponse> {
        const url = this.componentSettingsUrl(filter)
        const res = await this.webservice.getData<WebOCComponentSettingsResponse>(url.toString());
        return res.data;
    }

    /**
     * Get the what if scenarios
     *
     * @param filter search options
     * @returns WhatIfScenarios API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getWhatIfScenarios(filter: WhatIfScenariosFilter): Promise<WhatIfScenarioResponse> {
        const url = this.whatIfScenariosUrl(filter)
        const res = await this.webservice.getData<WhatIfScenarioResponse>(url.toString());
        return res.data;
    }

    /**
     * Post time series edits.
     *
     * @param editUrl URL to post the time series edits to
     * @param timeSeriesEvents Time Series Events to be updated
     * @returns Updated time series events
     * @throws 'Fetch Error' if fetch result is not ok
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
     * Runs a workflow task for a given workflowId.
     *
     * @param filter an object with request query parameters
     * @param piParametersXmlContent URL Encoded model parameters content that validates against the
     *                               following xsd: https://fewsdocs.deltares.nl/schemas/version1.0/pi-schemas/pi_modelparameters.xsd
     *
     * @returns the taskId of the submitted job.
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async postRunTask(filter: RunTaskFilter, piParametersXmlContent: string): Promise<string> {
        const url = this.runTaskUrl(filter)
        const requestOptions = new RequestOptions()
        requestOptions.relativeUrl = !url.toString().startsWith("http")

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        const res = await this.webservice.postDataWithParser<string>(url.toString(), requestOptions, new PlainTextParser(), piParametersXmlContent, headers);
        return res.data
    }

    /**
     * Runs a what if scenario for a given whatIfTemplateId.
     *
     * @param filter an object with request query parameters
     * @param piParametersXmlContent URL Encoded model parameters content that validates against the
     *                              following xsd: https://fewsdocs.deltares.nl/schemas/version1.0/pi-schemas/pi_modelparameters.xsd
     * @returns the WhatIfScenario of the submitted job.
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async postWhatIfScenario(filter: PostWhatIfScenarioFilter, piParametersXmlContent: string): Promise<PostWhatIfScenarioResponse> {
        const url = this.postWhatIfScenarioUrl(filter)
        const requestOptions = new RequestOptions()
        requestOptions.relativeUrl = !url.toString().startsWith("http")

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        const res = await this.webservice.postDataWithParser<PostWhatIfScenarioResponse>(url.toString(), requestOptions, new DefaultParser(), piParametersXmlContent, headers);
        return res.data
    }

    /**
     * Get the reporets for filter
     *
     * @param filter search options
     * @returns Reports API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getReports(filter: ReportsFilter): Promise<ReportsResponse> {
        const url = this.reportsUrl(filter)
        const res = await this.webservice.getData<ReportsResponse>(url.toString());
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
     * Construct URL for log displays request
     *
     * @returns complete url for making a request
     */
    logDisplaysUrl(filter: LogDisplaysFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/logdisplays${queryParameters}`,
            this._baseUrl
        )
    }

    /**
     * Construct URL for locations tooltip request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    locationsTooltipUrl(filter: LocationsTooltipFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/locations/tooltip${queryParameters}`,
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
     * Constructs URL for time series grid max values request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    timeSeriesGridMaxValuesUrl(filter: TimeSeriesGridMaxValuesFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/timeseries/grid/maxvalues${queryParameters}`,
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
     *
     * Construct URL for icon file from the IconFiles folder.
     * In case an absolute URL is passed, the passed path will be returned as URL.
     *
     * @returns complete url for making a request
     */
    resourcesIconsUrl(resource: string): URL {
        if (resource.startsWith("http://") || resource.startsWith("https://") ) return new URL(resource)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/resources/icons/${resource}`,
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

    /**
     * Construct URL for topology thresholds request
     *
     * @returns complete url for making a request
     */
    topologyThresholdsUrl(): URL {
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/topology/thresholds`,
            this._baseUrl
        )
    }

    timeSeriesTopologyActionsUrl(filter: TimeSeriesTopologyActionsFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/timeseries/topology/actions${queryParameters}`,
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

    runTaskUrl(filter: RunTaskFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/runtask${queryParameters}`,
            this._baseUrl
        )
    }

    reportsUrl(filter: ReportsFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/reports${queryParameters}`,
            this._baseUrl
        )
    }

    workflowsUrl(filter: WorkflowsFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/workflows${queryParameters}`,
            this._baseUrl
        )
    }

    moduleRunTimesUrl(filter: ModuleRuntimesFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/moduleruntimes${queryParameters}`,
            this._baseUrl
        )
    }

    dashboardsUrl(filter: DashboardsFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/dashboards${queryParameters}`,
            this._baseUrl
        )
    }

    logDisplayLogsUrl(filter: LogDisplayLogsFilter): URL {
        const { logDisplayId, ...remainingFilter } = filter
        const queryParameters = filterToParams(remainingFilter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/logdisplays/${logDisplayId}/logs${queryParameters}`,
            this._baseUrl
        )
    }

    whatIfScenariosUrl(filter: WhatIfScenariosFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/whatifscenarios${queryParameters}`,
            this._baseUrl
        )
    }

    whatIfTemplatesUrl(filter: WhatIfTemplatesFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/whatiftemplates${queryParameters}`,
            this._baseUrl
        )
    }

    postWhatIfScenarioUrl(filter: PostWhatIfScenarioFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/whatifscenarios${queryParameters}`,
            this._baseUrl
        )
    }

    componentSettingsUrl(filter: ComponentSettingsFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/weboc/config/componentsettings${queryParameters}`,
            this._baseUrl
        )
    }

}
