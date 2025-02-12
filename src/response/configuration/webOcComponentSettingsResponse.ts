/* tslint:disable */

/**
 * WebOCComponentSettingsResponse PI_JSON
 */
export interface WebOCComponentSettingsResponse {
  webOCComponentSettings?: WebOCComponnetSettings;
}
export interface WebOCComponnetSettings {
  id?: string;
  map?: Map;
  charts?: Charts;
  ssd?: SSD;
  report?: Report;
}
export interface Map {
  wmsLayer?: WmsLayer;
  locationsLayer?: LocationsLayer;
  overlays?: Overlays;
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
export interface Overlays {
  overlay?: Overlay;
}
export interface Overlay {
  locations?: Locations;
  visible?: boolean;
}
export interface Locations {
  id?: string;
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
export interface Charts {
  general?: General;
  actions?: Actions;
  timeSeriesChart?: Chart;
  timeSeriesTable?: TimeSeriesTable;
  verticaProfileChart?: Chart;
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
export interface SSD {
  zoomEnabled?: boolean;
  singleClickAction?: boolean;
  doubleClickAction?: boolean;
  useBrowserStyle?: boolean;
}
export interface Report {
  downloadReport?: boolean;
  hideNonCurrentReports?: boolean;
  hideReportName?: boolean;
  hideAnalysisTime?: boolean;
}
