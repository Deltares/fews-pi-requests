/* tslint:disable */

/**
 * TimeSeriesFlagSources PI_JSON
 */
export interface TimeSeriesFlagSourcesResponse {
  flagSources?: TimeSeriesFlagSource[];
}
export interface TimeSeriesFlagSource {
  /**
   * the id of the flag
   */
  id: string | null;
  /**
   * Name of the flag
   */
  name: string;
}
