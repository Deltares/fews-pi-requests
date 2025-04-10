/* tslint:disable */

/**
 * TimeSteps PI_JSON
 */
export interface TimeStepsResponse {
  timeSteps?: TimeSteps[];
}
export interface TimeSteps {
  /**
   * id of the time step
   */
  id: string;
  /**
   * Label of the time step.
   */
  label: string;
}
