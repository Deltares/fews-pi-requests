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
  url?: string;
  plotId?: string;
  displayId?: string;
  locationIds?: string[];
  mainPanel?: string;
  filterIds?: string[];
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
  reportDisplay?: ReportDisplayItem;
  /**
   * id of the scada panel which is coupled to this topology node
   */
  scadaPanelId?: string;
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
