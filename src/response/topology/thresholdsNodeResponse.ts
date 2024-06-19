/* tslint:disable */

/**
 * TopologyThresholds PI_JSON
 */
export interface TopologyThresholdNodeResponse {
  /**
   * TopologyThresholds
   */
  topologyNodes: TopologyThresholdNode[];
}
export interface TopologyThresholdNode {
  id: string;
  topologyLocationIcon?: string;
  filterLocationsCount?: number;
}
