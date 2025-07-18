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
  /**
   * TaskRunIds
   */
  taskRunIds?: string[];
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
  plotId?: string;
  period?: ActionPeriod;
  index?: number;
  forecastLegend?: string;
  subplots?: TimeSeriesDisplaySubplot[];
}
export interface ActionPeriod {
  startDate: ActionsPeriodDate;
  endDate: ActionsPeriodDate;
}
/**
 * Date
 */
export interface ActionsPeriodDate {
  /**
   * Date
   */
  date: string;
  /**
   * Time
   */
  time: string;
}
export interface TimeSeriesDisplaySubplot {
  xAxis?: TimeSeriesDisplayPlotItemXAxis;
  items: TimeSeriesDisplaySubplotItem[];
}
export interface TimeSeriesDisplayPlotItemXAxis {
  axisLabel: string;
  axisMinValue?: number;
  axisMaxValue?: number;
}
export interface TimeSeriesDisplaySubplotItem {
  type: "line" | "area" | "horizontalColorCode";
  /**
   * Bar margin in pixels. Only supported for type horizontalColorCode.
   */
  barMargin?: number;
  /**
   * Class Breaks
   */
  classBreaks?: ClassBreaks[];
  legend?: string;
  color?: string;
  lineStyle?: string;
  /**
   * Plot weight.
   */
  plotWeight?: number;
  visibleInLegend: boolean;
  visibleInPlot: boolean;
  visibleInTable: boolean;
  lineWidth?: number;
  opaquenessPercentage?: number;
  markerStyle?: string;
  markerSize?: number;
  locationId?: string;
  taskRunId?: string;
  yAxis?: TimeSeriesDisplaySubplotItemAxis;
  /**
   * Inverted y-axis.
   */
  inverted?: boolean;
  /**
   * Logarithmic y-axis.
   */
  logarithmic?: boolean;
  thresholdAxis?: "left" | "right" | "both" | "none";
  thresholdAxisScaling?: "two thresholds" | "no thresholds" | "all thresholds";
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
export interface ClassBreaks {
  lowerValue: number;
  color: string;
  label: string;
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
  /**
   * Label alignment for the threshold label.
   */
  labelAlignment?: "left" | "right";
}
