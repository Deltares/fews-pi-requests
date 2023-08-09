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
  displayId?: string;
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
}
/**
 * Selectesd grid display
 */
export interface GridDisplaySelection {
  plotId: string;
}
export interface TopologyDisplayGroupItem {
  displayGroupId: string;
  /**
   * TopologyDisplayGroupPlotNode
   */
  plotNodes?: TopologyDisplayGroupPlotNode[];
}
export interface TopologyDisplayGroupPlotNode {
  displayId: string;
  displayName?: string;
}
