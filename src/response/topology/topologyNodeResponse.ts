/* tslint:disable */

/**
 * TopologyNodes PI_JSON
 */
export interface TopologyNodeResponse {
  /**
   * TopologyNodes
   */
  topologyNodes: TopologyNode[];
}
export interface TopologyNode {
  id: string;
  name: string;
  workflowId?: string;
  localRun?: boolean;
  componentSettingsId?: string;
  icon?: string;
  iconId?: string;
  url?: string;
  embedUrl?: string;
  plotId?: string;
  displayId?: string;
  boundingBox?: BoundingBox;
  locationIds?: string[];
  mainPanel?: string;
  filterIds?: string[];
  disableMap?: boolean;
  documentFile?: string;
  gridDisplaySelection?: GridDisplaySelection;
  /**
   * Display group item
   */
  displayGroups?: TopologyDisplayGroupItem[];
  /**
   * TopologyNodes
   */
  topologyNodes?: TopologyNode[];
  /**
   * Secondary workflows
   */
  secondaryWorkflows?: SecondaryWorkflowGroupItem[];
  dataDownloadDisplay?: DataDownloadDisplayItem;
  logDisplay?: LogDisplayItem;
  dynamicReportDisplay?: DynamicReportDisplayItem;
  /**
   * Dashboard panels
   */
  dashboardPanels?: DashboardPanelItem[];
  /**
   * Micro front ends
   */
  microFrontEnds?: MicroFrontEndItem[];
  reportDisplay?: ReportDisplayItem;
  /**
   * id of the document which is coupled to this topology node
   */
  documentDisplayId?: string;
  /**
   * id of the data analysis display which is coupled to this topology node
   */
  dataAnalysisDisplayId?: string;
  /**
   * id of the scada panel which is coupled to this topology node
   */
  scadaPanelId?: string;
}
/**
 * Bounding box according to CRS EPSG:3857 Web Mercator format
 */
export interface BoundingBox {
  crs: "EPSG:3857";
  minx: string;
  maxy: string;
  maxx: string;
  miny: string;
}
/**
 * Selectesd grid display
 */
export interface GridDisplaySelection {
  plotId: string;
}
export interface TopologyDisplayGroupItem {
  displayGroupId: string;
  displayGroupName?: string;
  /**
   * TopologyDisplayGroupPlotNode
   */
  plotNodes?: TopologyDisplayGroupPlotNode[];
}
export interface TopologyDisplayGroupPlotNode {
  displayId: string;
  displayName?: string;
}
export interface SecondaryWorkflowGroupItem {
  secondaryWorkflowId: string;
  description: string;
  /**
   * SecondaryWorkflowProperties
   */
  properties?: SecondaryWorkflowProperties[];
}
export interface SecondaryWorkflowProperties {
  type: "string" | "float" | "bool" | "double" | "int" | "dateTime";
  key: string;
  description?: string;
  editable?: boolean;
  value?: string;
  date?: string;
  time?: string;
}
/**
 * Data download display
 */
export interface DataDownloadDisplayItem {
  showLocationName: "id" | "short name" | "name";
  showParameterName: "id" | "short name" | "name";
  /**
   * DataDownloadDisplayItemAttributes
   */
  attributes: DataDownloadDisplayAttributeItem[];
}
export interface DataDownloadDisplayAttributeItem {
  id: string;
  name: string;
}
/**
 * Log display
 */
export interface LogDisplayItem {
  id: string;
}
/**
 * Dynamic report display
 */
export interface DynamicReportDisplayItem {
  id: string;
}
export interface DashboardPanelItem {
  id: string;
}
export interface MicroFrontEndItem {
  id: string;
}
/**
 * Report display
 */
export interface ReportDisplayItem {
  /**
   * ReportDisplayItemDetails
   */
  reports: ReportDisplayItemDetails[];
}
export interface ReportDisplayItemDetails {
  moduleInstanceId: string;
}
