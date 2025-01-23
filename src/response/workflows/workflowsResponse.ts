/* tslint:disable */

/**
 * WorkflowResponse PI_JSON
 */
export interface WorkflowResponse {
  /**
   * Workflows
   */
  workflows: Workflow[];
}
export interface Workflow {
  /**
   * the id of the workflow
   */
  id: string;
  /**
   * The name of the workflow
   */
  name: string;
  /**
   * The description of the workflow
   */
  description: string;
  /**
   * The whatif template id
   */
  whatIfTemplateId?: string;
  /**
   * the minimum forecast length of the workflow
   */
  minimumForecastLength?: string;
  /**
   * the maximum forecast length of the workflow
   */
  maximumForecastLength?: string;
}
