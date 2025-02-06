/* tslint:disable */

/**
 * WhatIfScenarioResponse PI_JSON
 */
export interface WhatIfScenarioResponse {
  /**
   * WhatIfScenarioDescriptors
   */
  whatIfScenarioDescriptors: WhatIfScenarioDescriptors[];
}
export interface WhatIfScenarioDescriptors {
  /**
   * the id of the whatif
   */
  id: string;
  /**
   * the name of the whatif
   */
  name: string;
  /**
   * The parent of the whatif
   */
  parentWhatIfId?: string;
  /**
   * The whatif template id
   */
  whatIfTemplateId?: string;
  /**
   * The properties of the whatif
   */
  properties?: {
    [k: string]: unknown;
  };
}
