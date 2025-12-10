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
    ReportFilter,
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
    ForecasterNoteRequest,
    ForecasterNotesFilter,
    FssInfoFilter,
    ForecastTimesFilter,
    TopologyThresholdFilter,
    ForecasterNoteKeysRequest,
    LogDisplayLogsActionRequest,
    CorrelationFilter,
    DataAnalysisDisplaysFilter,
    TaskRunStatusFilter,
    UserSettingsFilter,
    PostUserSettingsFilter,
    UserSettingsUsersFilter,
    TimeStepsFilter,
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
    WhatIfScenarioDescriptorsResponse,
    PostWhatIfScenarioResponse,
    WebOCDashboardsResponse,
    WebOCComponentSettingsResponse,
    TopologyNodeResponse,
    ForecasterNotesResponse,
    WorkflowFssInfoResponse,
    WorkflowForecastTimesResponse,
    TimeStepsResponse,
    ColorsResponse,
    DynamicReportDisplayCapabilitiesResponse,
    DynamicReportDisplayDataResponse,
    CorrelationResponse,
    DataAnalysisDisplaysResponse,
    TaskRunStatusResponse,
    UserSettingUsersResponse,
} from "./response";

import { convertToParameterGroups } from './output/parameters/convertToParameterGroups.js'
import type { ParameterGroupsOutputOptions, ParameterOutputOptions } from './output/parameters/parameterOutputOptions'
import type { ParameterGroupsOutput } from './output/parameters/parameterGroupsOutput'
import {absoluteUrl, filterToParams, splitUrl} from "./utils/index.js";

import {DefaultParser, PiRestService, PlainTextParser, RequestOptions} from "@deltares/fews-web-oc-utils";
import type { ResponseParser, TransformRequestFunction } from "@deltares/fews-web-oc-utils";
import DataRequestResult from "@deltares/fews-web-oc-utils/lib/types/restservice/dataRequestResult";
import { DynamicReportDisplayCapabilitiesFilter, DynamicReportDisplayFilter } from './requestParameters/dynamicDisplayReportFilter'
import { DocumentDisplaysResponse } from './response/documentdisplays'
import { DocumentDisplaysFilter } from './requestParameters/documentDisplaysFilter'

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
     * Request document displays
     *
     * @returns DocumentDisplay PI API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getDocumentDisplays(filter: DocumentDisplaysFilter): Promise<DocumentDisplaysResponse> {
        const url = this.documentDisplaysUrl(filter);
        const res = await this.webservice.getData<DocumentDisplaysResponse>(url.toString());
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
        return await this.getTaskRunsResponse(url);
    }

    private async getTaskRunsResponse(url: URL): Promise<TaskRunsResponse> {
        if (url.toString().length <= this.maxUrlLength) {
            const res = await this.webservice.getData<TaskRunsResponse>(url.toString())
            return res.data
        } 

        const urls = splitUrl(url, this.maxUrlLength).map((u) => u.toString());
        const promises = urls.map((url) => this.webservice.getData<TaskRunsResponse>(url));
        const responses = await Promise.all(promises)

        const taskRuns = responses.flatMap(res => res.data.taskRuns ?? [])

        const response = responses[0].data
        if (taskRuns.length) {
            response.taskRuns = taskRuns
        }

        return response
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
     * @param filter an object with request query parameters
     * @returns all the active thresholds for the topology nodes
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getTopologyThresholds(filter: TopologyThresholdFilter): Promise<TopologyThresholdNodeResponse> {
        const url = this.topologyThresholdsUrl(filter)
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
     * Get the time zone used in FEWS
     *
     * @returns import status API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getTimeZoneId(): Promise<string> {
        const url = this.timeZoneIdUrl().toString();
        const parser = new PlainTextParser<string>();
        const requestOptions = new RequestOptions();
        requestOptions.relativeUrl = !url.startsWith('http');
        const res = await this.webservice.getDataWithParser<string>(url.toString(), requestOptions, parser);
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
     * Get colors that should be used for plotting
     * @returns colors API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getColors(): Promise<ColorsResponse> {
        const url = new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/colors/default`,
            this._baseUrl
        )
        const res = await this.webservice.getData<ColorsResponse>(url.toString());
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
     * Post a log display action
     *
     * @param request the log display action request
     * @returns the response from the server
     * @throws 'Fetch Error' if fetch result is not ok
     * */
    async postLogDisplaysAction(request: LogDisplayLogsActionRequest): Promise<string> {
        const { logDisplayId, ...body } = request;
        const url = this.logDisplayActionUrl(logDisplayId);
        const headers = {
            'Content-Type': "application/json"
        }
        const parser = new PlainTextParser<string>();
        const requestOptions = new RequestOptions();
        requestOptions.relativeUrl = !url.toString().startsWith("http")
        const res = await this.webservice.postDataWithParser<string>(url.toString(), requestOptions, parser, JSON.stringify(body), headers);
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
     * Get the forecaster notes
     *
     * @param filter search options
     * @returns ForecasterNotes API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getForecasterNotes(filter: ForecasterNotesFilter): Promise<ForecasterNotesResponse> {
        const url = this.forecasterNotesUrl(filter)
        const res = await this.webservice.getData<ForecasterNotesResponse>(url.toString());
        return res.data;
    }

    /**
     * Get the FSS info
     *
     * @param filter search options
     * @returns WorkflowFssInfo API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getFssInfo(filter: FssInfoFilter): Promise<WorkflowFssInfoResponse> {
        const url = this.fssInfoUrl(filter)
        const res = await this.webservice.getData<WorkflowFssInfoResponse>(url.toString());
        return res.data;
    }

    /**
     * Get the forecast times
     *
     * @param filter search options
     * @returns WorkflowForecastTimes API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getForecastTimes(filter: ForecastTimesFilter): Promise<WorkflowForecastTimesResponse> {
        const url = this.forecastTimesUrl(filter)
        const res = await this.webservice.getData<WorkflowForecastTimesResponse>(url.toString());
        return res.data;
    }

    async postForecasterNoteHelper(body: ForecasterNoteRequest | ForecasterNoteKeysRequest, url: URL): Promise<string> {
        const headers = {
            'Content-Type': "application/json"
        }
        const parser = new PlainTextParser<string>();
        const requestOptions = new RequestOptions();
        requestOptions.relativeUrl = !url.toString().startsWith("http")
        const res = await this.webservice.postDataWithParser<string>(url.toString(), requestOptions, parser, JSON.stringify(body), headers);
        return res.data;
    }

    /**
     * Post or update a forecaster note
     *
     * @param note the forecaster note to post
     * @returns whether the post was successful
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async postForecasterNote(note: ForecasterNoteRequest): Promise<string> {
        const url = this.forecasterNotesUrl({})
        return await this.postForecasterNoteHelper(note, url);
    }

    /**
     * Delete forecaster notes
     *
     * @param keys the forecaster note to post
     * @returns whether the deletion was successful
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async deleteForecasterNote(keys: ForecasterNoteKeysRequest): Promise<string> {
        const url = this.forecasterNotesUrl({}, "delete")
        return await this.postForecasterNoteHelper(keys, url);
    }

    /**
     * Acknowledge forecaster notes
     *
     * @param keys the forecaster notes to acknowledge
     * @returns whether the acknowledgement was successful
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async acknowledgeForecasterNote(keys: ForecasterNoteKeysRequest): Promise<string> {
        const url = this.forecasterNotesUrl({}, "acknowledge")
        return await this.postForecasterNoteHelper(keys, url);
    }

    /**
     * Unacknowledge forecaster notes
     *
     * @param keys the forecaster notes to unacknowledge
     * @returns whether the acknowledgement was successful
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async unacknowledgeForecasterNote(keys: ForecasterNoteKeysRequest): Promise<string> {
        const url = this.forecasterNotesUrl({}, "unacknowledge")
        return await this.postForecasterNoteHelper(keys, url);
    }

    /**
     * Get the what if scenarios
     *
     * @param filter search options
     * @returns WhatIfScenarios API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getWhatIfScenarios(filter: WhatIfScenariosFilter): Promise<WhatIfScenarioDescriptorsResponse> {
        const url = this.whatIfScenariosUrl(filter)
        const res = await this.webservice.getData<WhatIfScenarioDescriptorsResponse>(url.toString());
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
     * Get the reports for filter
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
     * Get the report for filter
     *
     * @param filter search options
     * @returns Report API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getReport(filter: ReportFilter): Promise<string> {
        const url = this.reportUrl(filter).toString();
        const parser = new PlainTextParser<string>();
        const requestOptions = new RequestOptions();
        requestOptions.relativeUrl = !url.startsWith('http');
        const res = await this.webservice.getDataWithParser<string>(url, requestOptions, parser);
        return res.data;
    }
    
    /**
     * Get the dynamic display for filter
     *
     * @param filter search options
     * @returns Report API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getDynamicReportDisplay(filter: DynamicReportDisplayFilter): Promise<string> {
        const url = this.dynamicReportDisplayUrl(filter).toString();
        const parser = new PlainTextParser<string>();
        const requestOptions = new RequestOptions();
        requestOptions.relativeUrl = !url.startsWith('http');
        const res = await this.webservice.getDataWithParser<string>(url, requestOptions, parser);
        return res.data;
    }

    /**
     * Get the dynamic display capabilities for filter
     *
     * @param filter search options
     * @returns Report API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getDynamicReportDisplayCapabilities(filter: DynamicReportDisplayCapabilitiesFilter): Promise<DynamicReportDisplayCapabilitiesResponse> {
        const url = this.dynamicReportDisplayUrl(filter, 'capabilities').toString();
        const res = await this.webservice.getData<DynamicReportDisplayCapabilitiesResponse>(url);
        return res.data;
    }

    /**
     * Get the dynamic display data for filter
     *
     * @param filter search options
     * @returns Report API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getDynamicReportDisplayData(filter: DynamicReportDisplayFilter): Promise<DynamicReportDisplayDataResponse> {
        const url = this.dynamicReportDisplayUrl(filter, 'data').toString();
        const res = await this.webservice.getData<DynamicReportDisplayDataResponse>(url);
        return res.data;
    }

    /**
     * Get the time steps for filter
     *
     * @param filter search options
     * @returns TimeStepsResponse API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getTimeSteps(filter: TimeStepsFilter): Promise<TimeStepsResponse> {
        const url = this.timeStepsUrl(filter);
        const res = await this.webservice.getData<TimeStepsResponse>(url.toString());
        return res.data;
    }

    /**
     * Get the correlation for filter
     *
     * @param filter search options
     * @returns CorrelationResponse API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getCorrelation(filter: CorrelationFilter): Promise<CorrelationResponse> {
        const url = this.correlationUrl(filter);
        const res = await this.webservice.getData<CorrelationResponse>(url.toString());
        return res.data;
    }

    /**
     * Get the data analysis displays for filter
     *
     * @param filter search options
     * @returns DataAnalysisDisplaysResponse API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getDataAnalysisDisplays(filter: DataAnalysisDisplaysFilter): Promise<DataAnalysisDisplaysResponse> {
        const url = this.dataAnalysisDisplaysUrl(filter);
        const res = await this.webservice.getData<DataAnalysisDisplaysResponse>(url.toString());
        return res.data;
    }

    /**
     * Get the task run status for filter
     *
     * @param filter search options
     * @returns TaskRunStatusResponse API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getTaskRunStatus(filter: TaskRunStatusFilter): Promise<TaskRunStatusResponse> {
        const url = this.taskRunStatusUrl(filter);
        const res = await this.webservice.getData<TaskRunStatusResponse>(url.toString());
        return res.data;
    }

    /**
     * Get the user settings for filter
     *
     * @param filter search options
     * @returns UserSettingsResponse API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getUserSettings<T>(filter: UserSettingsFilter, parser?: ResponseParser<T>): Promise<T> {
        const url = this.userSettingsUrl(filter);
        const requestOption = new RequestOptions();
        requestOption.relativeUrl = !url.toString().startsWith("http");
        const res = await this.webservice.getDataWithParser(url.toString(), requestOption, parser ?? new DefaultParser<T>());
        return res.data;
    }

    /**
     * Post the user settings for filter
     *
     * @param filter search options
     * @param body the body of the request
     * @returns the response from the server
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async postUserSettings(filter: UserSettingsFilter, body: string) {
        const url = this.userSettingsUrl(filter);
        const headers = {
            'Content-Type': "application/json"
        }
        const parser = new PlainTextParser<string>();
        const requestOptions = new RequestOptions();
        requestOptions.relativeUrl = !url.toString().startsWith("http")
        const res = await this.webservice.postDataWithParser<string>(url.toString(), requestOptions, parser, body, headers);
        return res.data;
    }

    /**
     * Get the user settings users for filter
     *
     * @param filter search options
     * @returns UserSettingUsersResponse API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getUserSettingsUsers(filter: UserSettingsUsersFilter): Promise<UserSettingUsersResponse> {
        const url = this.userSettingsUsersUrl(filter);
        const res = await this.webservice.getData<UserSettingUsersResponse>(url.toString());
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
     * Construct URL for document displays request
     *
     * @returns complete url for making a request
     */
    documentDisplaysUrl(filter: DocumentDisplaysFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/documentdisplays${queryParameters}`,
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
     * Construct URL for time zone information
     *
     * @returns complete url for making a request
     */
    timeZoneIdUrl(): URL {
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/timezoneid`,
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
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    topologyThresholdsUrl(filter: TopologyThresholdFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/topology/thresholds${queryParameters}`,
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

    reportUrl(filter: ReportFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/report${queryParameters}`,
            this._baseUrl
        )
    }

    dynamicReportDisplayUrl(filter: DynamicReportDisplayFilter | DynamicReportDisplayCapabilitiesFilter, path? : 'capabilities' | 'data'): URL {
        const queryParameters = filterToParams(filter)
        if (path) {
            return new URL(
                `${this._baseUrl.pathname}${this.API_ENDPOINT}/dynamicreportdisplays/${path}${queryParameters}`,
                this._baseUrl
            )
        }
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/dynamicreportdisplays${queryParameters}`,
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

    logDisplayActionUrl(logDisplayId: string): URL {
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/logdisplays/${logDisplayId}/action`,
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

    forecasterNotesUrl(filter: ForecasterNotesFilter, action?: 'delete' | 'acknowledge' | 'unacknowledge'): URL {
        const queryParameters = filterToParams(filter)
        if (action) {
            return new URL(
                `${this._baseUrl.pathname}${this.API_ENDPOINT}/forecasternotes/${action}/${queryParameters}`,
                this._baseUrl
            )
        }
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/forecasternotes${queryParameters}`,
            this._baseUrl
        )
    }

    fssInfoUrl(filter: FssInfoFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/workflows/fssinfo${queryParameters}`,
            this._baseUrl
        )
    }

    forecastTimesUrl(filter: ForecastTimesFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/workflows/forecasttimes${queryParameters}`,
            this._baseUrl
        )
    }

    timeSeriesFilterActionsUrl(filter: filterActionsFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/timeseries/filters/actions${queryParameters}`,
            this._baseUrl
        )
    }

    timeStepsUrl(filter: TimeStepsFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/timesteps${queryParameters}`,
            this._baseUrl
        )
    }

    correlationUrl(filter: CorrelationFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/statistics/correlation${queryParameters}`,
            this._baseUrl
        )
    }

    dataAnalysisDisplaysUrl(filter: DataAnalysisDisplaysFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/dataanalysisdisplays${queryParameters}`,
            this._baseUrl
        )
    }

    taskRunStatusUrl(filter: TaskRunStatusFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/taskrunstatus${queryParameters}`,
            this._baseUrl
        )
    }

    userSettingsUrl(filter: UserSettingsFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/usersettings${queryParameters}`,
            this._baseUrl
        )
    }

    postUserSettingsUrl(filter: PostUserSettingsFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/usersettings${queryParameters}`,
            this._baseUrl
        )
    }
    
    userSettingsUsersUrl(filter: UserSettingsUsersFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this._baseUrl.pathname}${this.API_ENDPOINT}/usersettings/users${queryParameters}`,
            this._baseUrl
        )
    }
}
