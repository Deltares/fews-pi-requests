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
    | WhatIfScenarioBooleanProperty
    | WhatIfScenarioTemplateIdProperty
    | WhatIfScenarioIntegerProperty
    | WhatIfScenarioStringProperty
    | WhatIfScenarioDoubleProperty
    | WhatIfScenarioConfigFileProperty
    | WhatIfScenarioEnumProperty
    | WhatIfScenarioDateTimeProperty
  )[];
}
export interface WhatIfScenarioBooleanProperty {
  id: string;
  type: "boolean";
  value: boolean;
}
export interface WhatIfScenarioTemplateIdProperty {
  id: string;
  type: "whatIfScenarioId";
  value: string;
}
export interface WhatIfScenarioIntegerProperty {
  id: string;
  type: "integer";
  value: number;
}
export interface WhatIfScenarioStringProperty {
  id: string;
  type: "string";
  value: string;
}
export interface WhatIfScenarioDoubleProperty {
  id: string;
  type: "number";
  value: number;
}
export interface WhatIfScenarioConfigFileProperty {
  id: string;
  type: "configFile";
  value: string;
}
export interface WhatIfScenarioEnumProperty {
  id: string;
  type: "enumProperty";
  value: string;
}
export interface WhatIfScenarioDateTimeProperty {
  id: string;
  type: "dateTime";
  value: string;
}
