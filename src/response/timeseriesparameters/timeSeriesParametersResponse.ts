/* tslint:disable */

/**
 * Is a datum used
 */
export type UseDatum = "true" | "false";

/**
 * TimeSeriesParameters PI_JSON
 */
export interface TimeSeriesParametersResponse {
  /**
   * PI Version
   */
  version: string;
  /**
   * TimeSeriesParameters
   */
  timeSeriesParameters: TimeSeriesParameter[];
}
export interface TimeSeriesParameter {
  /**
   * the id of the parameter
   */
  id: string;
  /**
   * The parameter name
   */
  name?: string;
  /**
   * The parameter type
   */
  parameterType?: string;
  /**
   * The parameter unit
   */
  unit?: string;
  /**
   * The parameter display unit
   */
  displayUnit?: string;
  usesDatum?: UseDatum;
  /**
   * The id of the parameter group this parameter is a member of
   */
  parameterGroup?: string;
  /**
   * The name of parameter group this parameter is a member of
   */
  parameterGroupName?: string;
  /**
   * The parameter group this parameter is a member of
   */
  shortName?: string;
  /**
   * Parameter Attributes
   */
  attributes?: TimeSeriesParameterAttributes[];
}
export interface TimeSeriesParameterAttributes {
  /**
   * Name
   */
  name: string;
  /**
   * Description
   */
  description?: string;
  /**
   * Type
   */
  type?: "text" | "boolean" | "number" | "dateTime";
  /**
   * Id
   */
  id?: string;
  /**
   * Start date time
   */
  startDateTime?: string;
  /**
   * End date time
   */
  endDateTime?: string;
  /**
   * Value
   */
  value?: string;
}
