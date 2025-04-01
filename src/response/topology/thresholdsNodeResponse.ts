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
  levelThresholdWarningLevels?: ParameterLevelThresholdWarningLevels[];
}
export interface AggregatedLevelThresholdCrossings {
  locationId: string;
  warningLevelId: string;
  warningLevelName: string;
  severity: number;
  icon: string;
  color: string;
  firstValue?: number;
  firstValueTime?: string;
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
  severity: number;
  icon?: string;
  count: number;
}
export interface LevelThresholdCrossings {
  locationId: string;
  parameterId: string;
  warningLevelId?: string;
  warningLevelName?: string;
  severity: number;
  icon: string;
  color: string;
  maxValue?: number;
  maxValueTime?: string;
  minValue?: number;
  minValueTime?: string;
  firstValue: number;
  firstValueTime: string;
  lastValue: number;
  lastValueTime: string;
}
export interface ParameterLevelThresholdWarningLevels {
  id: string;
  name: string;
  severity: number;
  icon?: string;
  /**
   * parameterWarningLevelCount
   */
  parameterWarningLevelCount?: ParameterCount[];
}
export interface ParameterCount {
  parameterId: string;
  count: number;
}
