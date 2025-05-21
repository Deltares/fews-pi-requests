/* tslint:disable */

/**
 * ColorsResponse PI_JSON
 */
export interface ColorsResponse {
  /**
   * Colors
   */
  colors: Color[];
}
export interface Color {
  /**
   * the hex color code
   */
  color: string;
  /**
   * The optional name of the color
   */
  name?: string;
}
