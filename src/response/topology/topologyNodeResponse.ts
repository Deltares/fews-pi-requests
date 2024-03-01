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
  showLocationName: string;
  showParameterName: string;
  /**
   * Attributes
   */
  attributes: AttributeItem[];
}
export interface AttributeItem {
  id: string;
  name: string;
}
