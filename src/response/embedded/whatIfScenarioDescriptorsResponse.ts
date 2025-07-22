/* tslint:disable */

/**
 * WhatIfScenarioDescriptorsResponse PI_JSON
 */
export interface WhatIfScenarioDescriptorsResponse {
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
   * Is this a single run whatif
   */
  singleRunWhatIf?: boolean;
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
    | WhatIfMultiProperty
    | WhatIfMultiProperty
    | WhatIfTriggeredProperty
  )[];
}
export interface WhatIfBooleanProperty {
  id: string;
  type: "boolean";
  value: boolean;
}
export interface WhatIfTemplateIdProperty {
  id: string;
  type: "whatIfTemplateId";
  value: string;
}
export interface WhatIfIntegerProperty {
  id: string;
  type: "integer";
  value: number;
}
export interface WhatIfStringProperty {
  id: string;
  type: "string";
  value: string;
}
export interface WhatIfDoubleProperty {
  id: string;
  type: "number";
  value: number;
}
export interface WhatIfConfigFileProperty {
  id: string;
  type: "configFile";
  value: string;
}
export interface WhatIfEnumProperty {
  id: string;
  type: "enumProperty";
  value: WhatIfEnumPropertyValue;
}
export interface WhatIfEnumPropertyValue {
  /**
   * the code of the value
   */
  code: string;
  /**
   * The label of the value
   */
  label: string;
}
export interface WhatIfDateTimeProperty {
  id: string;
  type: "dateTime";
  value: string;
}
export interface WhatIfMultiProperty {
  id: string;
  type: "multiPropertyEnumeration";
  value: string;
}
export interface WhatIfTriggeredProperty {
  id: string;
  type: "triggeredProperty";
  value: string;
}
