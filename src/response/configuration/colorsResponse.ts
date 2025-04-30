/* tslint:disable */

/**
 * Colors PI_JSON
 */
export interface ColorsResponse {
  colors?: Color[];
}
export interface Color {
  /**
   * Color hex code.
   * @example #FF0000
   */
  color: string;
  /**
   * Optional name of the color.
   */
  name?: string;
}
