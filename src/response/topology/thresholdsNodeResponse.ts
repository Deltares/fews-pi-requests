/* tslint:disable */

/**
 * TopologyThresholds PI_JSON
 */
export interface TopologyThresholdNodeResponse {
  /**
   * TopologyThresholds
   */
  topologyNodes: TopologyNode[];
}
export interface TopologyNode {
  id: string;
  topologyLocationIcon?: string;
  filterLocationsCount?: number;
  /**
   * TopologyNodes
   */
  topologyNodes?: TopologyNode[];
}
