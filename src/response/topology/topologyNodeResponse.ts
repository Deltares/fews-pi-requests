/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

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
  /**
   * Display group item
   */
  displayGroups?: TopologyDisplayGroupItem[];
  /**
   * TopologyNodes
   */
  topologyNodes?: TopologyNode[];
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
