/* tslint:disable */

/**
 * WhatIfTemplatesResponse PI_JSON
 */
export interface WhatIfTemplatesResponse {
  /**
   * WhatIfTemplates
   */
  whatIfTemplates: WhatIfTemplate[];
  [k: string]: unknown;
}
export interface WhatIfTemplate {
  /**
   * the id of the workflow
   */
  id: string;
  /**
   * The name of the workflow
   */
  name: string;
  /**
   * WhatIfProperties
   */
  properties: (
    | WhatIfConfigFileTemplateProperty
    | WhatIfBooleanTemplateProperty
    | WhatIfIntTemplateProperty
    | WhatIfDoubleTemplateProperty
    | WhatIfStringTemplateProperty
    | WhatIfDateTimeTemplateProperty
    | WhatIfTemplateIdTemplateProperty
    | WhatIfEnumTemplateProperty
    | WhatIfMultiProperty
  )[];
  /**
   * Determines if the what-if is a single run what-if by default
   */
  defaultSingleRunWhatIfSetting: boolean;
  /**
   * Determines if the default setting above can be overruled. Can a what-if which is by default not a single what-if be a single run what-if?
   */
  overrulableSingleRunWhatIf: boolean;
  [k: string]: unknown;
}
export interface WhatIfConfigFileTemplateProperty {
  /**
   * the id of the property
   */
  id: string;
  /**
   * The name of the property
   */
  name: string;
  /**
   * The type of the property
   */
  type: string;
  /**
   * The config file type
   */
  configFileType: "cold state" | "module dataset" | "module parameter";
  /**
   * The default config file
   */
  default?: string;
  /**
   * The configured pattern
   */
  pattern?: string;
  [k: string]: unknown;
}
export interface WhatIfBooleanTemplateProperty {
  /**
   * the id of the property
   */
  id: string;
  /**
   * The name of the property
   */
  name: string;
  /**
   * Boolean property
   */
  type: "boolean";
  /**
   * The default value of the property
   */
  defaultValue: boolean;
  [k: string]: unknown;
}
export interface WhatIfIntTemplateProperty {
  /**
   * the id of the property
   */
  id: string;
  /**
   * The name of the property
   */
  name: string;
  /**
   * The type of the property
   */
  type: string;
  /**
   * The default value of the property
   */
  defaultValue: number;
  [k: string]: unknown;
}
export interface WhatIfDoubleTemplateProperty {
  /**
   * the id of the property
   */
  id: string;
  /**
   * The name of the property
   */
  name: string;
  /**
   * The type of the property
   */
  type: string;
  /**
   * The default value of the property
   */
  defaultValue: number;
  /**
   * The min value of the property
   */
  minValue?: number;
  /**
   * The max value of the property
   */
  maxValue?: number;
  [k: string]: unknown;
}
export interface WhatIfStringTemplateProperty {
  /**
   * the id of the property
   */
  id: string;
  /**
   * The name of the property
   */
  name: string;
  /**
   * The type of the property
   */
  type: string;
  /**
   * The default value of the property
   */
  defaultValue: string;
  [k: string]: unknown;
}
export interface WhatIfDateTimeTemplateProperty {
  /**
   * the id of the property
   */
  id: string;
  /**
   * The name of the property
   */
  name: string;
  /**
   * The type of the property
   */
  type: string;
  /**
   * The default value of the property
   */
  defaultValue: string;
  relativePeriod?: Object;
  cardinalTimeStep?: Object1;
  [k: string]: unknown;
}
/**
 * View Period
 */
export interface Object {
  /**
   * Unit of the view period
   */
  unit: "second" | "minute" | "hour" | "day" | "week";
  /**
   * Start of the view period. Optional.
   */
  start?: string;
  /**
   * End of the view period. Optional.
   */
  end?: string;
}
/**
 * Cardinal time step
 */
export interface Object1 {
  /**
   * Timezone of the time step
   */
  timeZone: string;
  /**
   * Unit of the view period
   */
  unit: "second" | "minute" | "hour" | "day" | "week";
  /**
   * multiplier of the unit of the time step
   */
  multiplier: string;
}
export interface WhatIfTemplateIdTemplateProperty {
  /**
   * the id of the property
   */
  id: string;
  /**
   * The name of the property
   */
  name: string;
  /**
   * The type of the property
   */
  type: string;
  /**
   * The template id of the referenced whatif
   */
  templateId: string;
  [k: string]: unknown;
}
export interface WhatIfEnumTemplateProperty {
  /**
   * the id of the property
   */
  id: string;
  /**
   * The name of the property
   */
  name: string;
  /**
   * The type of the property
   */
  type: string;
  /**
   * The default value of the property
   */
  defaultValue: number;
  /**
   * value of the enum
   */
  value: {
    /**
     * the code of the value
     */
    code: string;
    /**
     * The label of the value
     */
    label: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface WhatIfMultiProperty {
  id: string;
  type: "multiProperty";
  name: string;
  defaultValue?: number;
  /**
   * WhatIfMultiPropertySelectionOptions
   */
  selectionOptions: MultiPropertySelectionOptions[];
}
export interface MultiPropertySelectionOptions {
  code: string;
  label: string;
}
