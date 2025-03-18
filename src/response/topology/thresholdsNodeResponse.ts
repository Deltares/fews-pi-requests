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
   * AggregatedLevelThresholdWarningLevels
   */
  aggregatedLevelThresholdWarningLevels?: LevelThresholdWarningLevels[];
  /**
   * LevelThresholdCrossings
   */
  levelThresholdCrossings?: LevelThresholdCrossings[];
  /**
   * LevelThresholdWarningLevels
   */
  levelThresholdWarningLevels?: LevelThresholdWarningLevels[];
}
export interface AggregatedLevelThresholdCrossings {
  locationId: string;
  warningLevelId: string;
  warningLevelName: string;
  icon: string;
  color: string;
  lastValue?: number;
  lastValueTime?: string;
  maxValue?: number;
  maxValueTime?: string;
  minValue?: number;
  minValueTime?: string;
}
export interface LevelThresholdWarningLevels {
  id: string;
  name: string;
  count: number;
  icon: string;
}
export interface LevelThresholdCrossings {
  locationId: string;
  parameterId: string;
  warningLevelId?: string;
  warningLevelName?: string;
  icon: string;
  color: string;
  maxValue?: number;
  maxValueTime?: string;
  minValue?: number;
  minValueTime?: string;
  lastValue: number;
  lastValueTime: string;
}
