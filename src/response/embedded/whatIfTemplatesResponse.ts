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
    | WhatIfTemplateConfigFileProperty
    | WhatIfTemplateBooleanProperty
    | WhatIfTemplateIntProperty
    | WhatIfTemplateNumberProperty
    | WhatIfTemplateStringProperty
    | WhatIfTemplateDateTimeProperty
    | WhatIfTemplateTemplateIdProperty
    | WhatIfTemplateEnumProperty
    | WhatIfTemplateMultiProperty
  )[];
  /**
   * Determines if the what-if is a single run what-if by default
   */
  defaultSingleRunWhatIfSetting: boolean;
  /**
   * Determines if the default setting above can be overruled. Can a what-if which is by default not a single what-if be a single run what-if?
   */
  overrulableSingleRunWhatIf: boolean;
}
export interface WhatIfTemplateConfigFileProperty {
  /**
   * the id of the property
   */
  id: string;
  /**
   * The name of the property
   */
  name: string;
  /**
   * Config file property
   */
  type: "configFile";
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
  /**
   * Hide the configured pattern
   */
  hidePattern?: boolean;
}
export interface WhatIfTemplateBooleanProperty {
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
}
export interface WhatIfTemplateIntProperty {
  /**
   * the id of the property
   */
  id: string;
  /**
   * The name of the property
   */
  name: string;
  /**
   * Integer property
   */
  type: "integer";
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
}
export interface WhatIfTemplateNumberProperty {
  /**
   * the id of the property
   */
  id: string;
  /**
   * The name of the property
   */
  name: string;
  /**
   * Number property
   */
  type: "number";
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
}
export interface WhatIfTemplateStringProperty {
  /**
   * the id of the property
   */
  id: string;
  /**
   * The name of the property
   */
  name: string;
  /**
   * String property
   */
  type: "string";
  /**
   * The default value of the property
   */
  defaultValue: string;
}
export interface WhatIfTemplateDateTimeProperty {
  /**
   * the id of the property
   */
  id: string;
  /**
   * The name of the property
   */
  name: string;
  /**
   * Date-time property
   */
  type: "dateTime";
  /**
   * The default value of the property
   */
  defaultValue: string;
  relativePeriod?: Object;
  relativeViewPeriod?: Object1;
  cardinalTimeStep?: Object2;
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
 * View Period
 */
export interface Object1 {
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
export interface Object2 {
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
  multiplier: number;
}
export interface WhatIfTemplateTemplateIdProperty {
  /**
   * the id of the property
   */
  id: string;
  /**
   * The name of the property
   */
  name: string;
  /**
   * Template id property
   */
  type: "whatIfTemplateId";
  /**
   * The template id of the referenced whatif
   */
  templateId: string;
}
export interface WhatIfTemplateEnumProperty {
  /**
   * the id of the property
   */
  id: string;
  /**
   * The name of the property
   */
  name: string;
  /**
   * Enum property
   */
  type: "enumProperty";
  /**
   * The default value of the property
   */
  defaultValue: string;
  /**
   * values of the enum
   */
  values: MultiPropertySelectionOptions[];
}
export interface MultiPropertySelectionOptions {
  code: string;
  label: string;
  triggerProperties?: TriggerProperty[];
}
export interface TriggerProperty {
  code: string;
  triggerProperty: string;
}
export interface WhatIfTemplateMultiProperty {
  id: string;
  type: "multiProperty";
  name: string;
  defaultValue?: string;
  /**
   * WhatIfMultiPropertySelectionOptions
   */
  selectionOptions: MultiPropertySelectionOptions[];
}
