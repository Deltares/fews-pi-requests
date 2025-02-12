/* tslint:disable */

/**
 * WebOCComponentSettingsResponse PI_JSON
 */
export interface WebOCComponentSettingsResponse {
  webOCComponentSettings?: WebOCComponentSettings;
}
export interface WebOCComponentSettings {
  id?: string;
  map?: MapSettings;
  charts?: ChartsSettings;
  ssd?: SSDSettings;
  report?: ReportSettings;
}
export interface MapSettings {
  wmsLayer?: WmsLayer;
  locationsLayer?: LocationsLayer;
  overlays?: Overlay[];
}
export interface WmsLayer {
  show?: boolean;
  autoPlay?: boolean;
  animateVectors?: boolean;
  doubleClickAction?: boolean;
}
export interface LocationsLayer {
  show?: boolean;
  locationNames?: boolean;
  singleClickAction?: boolean;
  locationSearchEnabled?: boolean;
}
export interface Overlay {
  id?: string;
  visible?: boolean;
  name?: string;
  locationSetId?: string;
  type?: string;
  paint?: Paint;
}
export interface Paint {
  lineOpacity?: number;
  lineColor?: string;
  lineWidth?: number;
  fillAntiAlias?: boolean;
  fillOpacity?: number;
  fillColor?: string;
  fillOutlineColor?: string;
}
export interface ChartsSettings {
  general?: General;
  actions?: Actions;
  timeSeriesChart?: Chart;
  timeSeriesTable?: TimeSeriesTable;
  verticalProfileChart?: Chart;
  verticalProfileTable?: TimeSeriesTable;
  metaDataPanel?: MetaDataPanel;
}
export interface General {
  startPanel?: string;
  hideToolBar?: string;
  showLocationNames?: boolean;
}
export interface Actions {
  panelPlacement?: PanelPlacement;
  downloadData?: boolean;
  downloadMetaData?: boolean;
  downloadFigure?: boolean;
}
export interface PanelPlacement {
  defaultPlacement?: string;
  allowedPlacement?: string[];
}
export interface Chart {
  enabled?: boolean;
  legend?: Legend;
  xAxis?: XAxis;
  yAxis?: YAxis;
}
export interface Legend {
  numberOfLines?: string;
  placement?: string;
}
export interface XAxis {
  show?: boolean;
  xTicks?: boolean;
  xLabel?: boolean;
}
export interface YAxis {
  show?: boolean;
  yTicks?: boolean;
  yLabel?: boolean;
}
export interface TimeSeriesTable {
  enabled?: boolean;
  allowDepthSorting?: boolean;
  sortDepthColumn?: string;
}
export interface MetaDataPanel {
  enabled?: boolean;
}
export interface SSDSettings {
  zoomEnabled?: boolean;
  singleClickAction?: boolean;
  doubleClickAction?: boolean;
  useBrowserStyle?: boolean;
}
export interface ReportSettings {
  downloadReport?: boolean;
  hideNonCurrentReports?: boolean;
  hideReportName?: boolean;
  hideAnalysisTime?: boolean;
}
