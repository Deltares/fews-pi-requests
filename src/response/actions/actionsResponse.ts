/* tslint:disable */

/**
 * ActionsResponse PI_JSON
 */
export interface ActionsResponse {
  resultsNotAvailableForRequest?: boolean;
  /**
   * ActionsResults
   */
  results: ActionResult[];
}
export interface ActionResult {
  type: "PI" | "SSD" | "PDF" | "URL" | "WMS";
  title?: string;
  /**
   * ActionRequests
   */
  requests: ActionRequest[];
  config?: ActionRequestConfig;
}
export interface ActionRequest {
  key?: string;
  request: string;
  /**
   * URL to post changes to the timeseries. In case of an ensemble the ensembleMemberId has to be added. Only relevant for PI requests. If the timeSeries is not editable, the editRequest is missing.
   */
  editRequest?: string;
  editPermissions?: ("values" | "comments" | "flags")[];
  /**
   * URL to show of the timeseries. The time parameter has to be added to show the history. In case of an ensemble the ensembleMemberId has to be added. Only relevant for PI requests.
   */
  historyRequest?: string;
}
export interface ActionRequestConfig {
  timeSeriesDisplay: TimeSeriesDisplayConfig;
}
export interface TimeSeriesDisplayConfig {
  /**
   * Error in case a not supported configuration is used.
   */
  error?: string;
  title?: string;
  forecastLegend?: string;
  subplots?: TimeSeriesDisplaySubplot[];
}
export interface TimeSeriesDisplaySubplot {
  xAxis?: TimeSeriesDisplaySubplotItemXAxis;
  items: TimeSeriesDisplaySubplotItem[];
}
export interface TimeSeriesDisplaySubplotItemXAxis {
  axisLabel: string;
  axisMinValue?: number;
  axisMaxValue?: number;
}
export interface TimeSeriesDisplaySubplotItem {
  type: string;
  legend?: string;
  color: string;
  lineStyle?: string;
  visibleInLegend: boolean;
  visibleInPlot: boolean;
  visibleInTable: boolean;
  lineWidth?: number;
  opaquenessPercentage?: number;
  markerStyle?: string;
  markerSize?: number;
  locationId?: string;
  yAxis?: TimeSeriesDisplaySubplotItemAxis;
  /**
   * Thresholds
   */
  thresholds?: TimeSeriesDisplaySubplotItemThreshold[];
  /**
   * Key of the request. Only used if there is only one request.
   */
  request?: string;
  /**
   * Array with the keys of the requests. Only used if there are multiple requests.
   */
  requests?: string[];
}
export interface TimeSeriesDisplaySubplotItemAxis {
  axisPosition?: string;
  axisLabel?: string;
  axisMinValue?: number;
  axisMaxValue?: number;
}
/**
 * Threshold
 */
export interface TimeSeriesDisplaySubplotItemThreshold {
  value?: number;
  label?: string;
  color?: string;
}
