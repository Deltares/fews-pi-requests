/* tslint:disable */

/**
 * TopologyThresholds PI_JSON
 */
export interface TopologyThresholdNodeResponse {
  /**
   * TopologyThresholdNodes
   */
  topologyNodes: TopologyThresholdNode[];
}
export interface TopologyThresholdNode {
  id: string;
  topologyLocationIcon?: string;
  filterLocationsCount?: number;
  /**
   * AggregatedLevelThresholdCrossings
   */
  aggregatedLevelThresholdCrossings?: AggregatedLevelThresholdCrossings[];
  /**
   * LevelThresholdCrossings
   */
  levelThresholdCrossings?: LevelThresholdCrossings[];
}
export interface AggregatedLevelThresholdCrossings {
  locationId: string;
  levelThresholdId: string;
  levelThresholdName: string;
  icon: string;
  color: string;
}
export interface LevelThresholdCrossings {
  locationId: string;
  parameterId: string;
  levelThresholdId: string;
  levelThresholdName: string;
  icon: string;
  color: string;
  maxValue?: number;
  maxValueTime?: string;
  minValue?: number;
  minValueTime?: string;
  lastValue: number;
  lastValueTime: string;
}
