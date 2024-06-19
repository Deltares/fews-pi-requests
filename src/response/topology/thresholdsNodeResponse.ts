/* tslint:disable */

/**
 * TopologyThresholds PI_JSON
 */
export interface TopologyThresholdNodeResponse {
  /**
   * TopologyThresholds
   */
  topologyThresholdNodes: TopologyThresholdNode[];
}
export interface TopologyThresholdNode {
  id: string;
  topologyLocationIcon?: string;
  filterLocationsCount?: number;
}
