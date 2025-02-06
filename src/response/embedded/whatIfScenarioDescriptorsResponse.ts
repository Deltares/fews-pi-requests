/* tslint:disable */

/**
 * WhatIfScenarioResponse PI_JSON
 */
export interface WhatIfScenarioResponse {
  /**
   * WhatIfScenarioDescriptors
   */
  whatIfScenarioDescriptors: WhatIfScenarioDescriptor[];
}
export interface WhatIfScenarioDescriptor {
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
   * WhatIfProperties
   */
  properties?: (
    | WhatIfBooleanProperty
    | WhatIfTemplateIdProperty
    | WhatIfIntegerProperty
    | WhatIfStringProperty
    | WhatIfDoubleProperty
    | WhatIfConfigFileProperty
    | WhatIfEnumProperty
    | WhatIfDateTimeProperty
  )[];
}
export interface WhatIfBooleanProperty {
  type: "boolean";
  value: boolean;
}
export interface WhatIfTemplateIdProperty {
  type: "whatIfTemplateId";
  value: string;
}
export interface WhatIfIntegerProperty {
  type: "integer";
  value: number;
}
export interface WhatIfStringProperty {
  type: "string";
  value: string;
}
export interface WhatIfDoubleProperty {
  type: "number";
  value: number;
}
export interface WhatIfConfigFileProperty {
  type: "configFile";
  value: string;
}
export interface WhatIfEnumProperty {
  type: "enumProperty";
  value: string;
}
export interface WhatIfDateTimeProperty {
  type: "dateTime";
  value: string;
}
