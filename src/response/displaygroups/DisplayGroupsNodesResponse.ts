/* tslint:disable */

/**
 * DisplayGroupsNodes PI_JSON
 */
export interface DisplayGroupsNodesResponse {
  /**
   * DisplayGroupsNodes
   */
  displayGroups: DisplayGroupsNodes[];
}
export interface DisplayGroupsNodes {
  displayGroupId: string;
  displayGroupName?: string;
  /**
   * DisplayGroupsPlotNode
   */
  plotNodes?: DisplayGroupsPlotNode[];
  /**
   * DisplayGroupsPlotNode
   */
  displayGroups?: DisplayGroupsNodes[];
}
export interface DisplayGroupsPlotNode {
  displayId: string;
  displayName?: string;
}
