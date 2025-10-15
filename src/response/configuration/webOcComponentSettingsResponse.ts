/* tslint:disable */

/**
 * WebOCComponentSettings PI_JSON
 */
export interface WebOCComponentSettingsResponse {
  webOCComponentSettings?: WebOCComponentSettingsClass;
}
export interface WebOCComponentSettingsClass {
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
  lineColor?: string;
  lineWidth?: number;
  fillAntiAlias?: boolean;
  fillColor?: string;
  fillOutlineColor?: string;
  lineOpacity?: number;
  fillOpacity?: number;
}
export interface ChartsSettings {
  general?: General;
  actions?: Actions;
  timeSeriesChart?: Chart;
  timeSeriesTable?: TimeSeriesTable;
  verticalProfileChart?: Chart;
  verticalProfileTable?: VerticalProfileTable;
  metaDataPanel?: MetaDataPanel;
}
export interface General {
  startPanel?:
    | "timeSeriesChart"
    | "verticalProfileChart"
    | "timeSeriesTable"
    | "verticalProfileTable"
    | "metaDataPanel";
  toolBar?: "false" | "true" | "auto";
  locationNames?: boolean;
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
  minNumberOfLines?: string;
  maxNumberOfLines?: string;
  placement?: string;
}
export interface XAxis {
  enabled?: boolean;
  xTicks?: boolean;
  xLabel?: boolean;
}
export interface YAxis {
  enabled?: boolean;
  yTicks?: boolean;
  yLabel?: boolean;
}
export interface TimeSeriesTable {
  enabled?: boolean;
  allowDateTimeSorting?: boolean;
  sortDateTimeColumn?: string;
}
export interface VerticalProfileTable {
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
  nonCurrentReports?: boolean;
  reportName?: boolean;
  analysisTimes?: boolean;
}
