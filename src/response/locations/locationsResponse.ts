/* tslint:disable */

/**
 * LocationsResponse PI_JSON
 */
export interface LocationsResponse {
  /**
   * PI Version
   */
  version: string;
  /**
   * The geo datum
   */
  geoDatum: string;
  /**
   * Locations
   */
  locations: Location[];
}
export interface Location {
  /**
   * the id of the location
   */
  locationId: string;
  /**
   * The location name
   */
  locationName?: string;
  /**
   * The description of the locations
   */
  description?: string;
  /**
   * The Short name of the location
   */
  shortName?: string;
  /**
   * Start date time in case a time dependent relation is use
   */
  startDateTime?: string;
  /**
   * End date time in case a time dependent relation is use
   */
  endDateTime?: string;
  /**
   * Latitude
   */
  lat?: string;
  /**
   * Longitude
   */
  lon?: string;
  /**
   * X
   */
  x?: string;
  /**
   * Y
   */
  y?: string;
  /**
   * Z
   */
  z?: string;
  /**
   * Location Attributes
   */
  attributes?: Attributes[];
  /**
   * Related Locations
   */
  relations?: LocationRelation[];
  /**
   * Id of the parent location
   */
  parentLocationId?: string;
  /**
   * Since 2023.03: Name of the location icon. Can be used with the resource /icons/{iconName} endpoint to get the icon
   */
  iconName?: string;
  /**
   * Since 2023.02: Name of the threshold icon. If there are no crossed thresholds then this item will be omitted. Can be used with the resource /icons/{iconName} endpoint to get the icon
   */
  thresholdIconName?: string;
  /**
   * Since 2023.02: Severity of the threshold, 0 is the lowest severity. If there are no crossed thresholds then this item will be omitted.
   */
  thresholdSeverity?: number;
}
export interface Attributes {
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
export interface LocationRelation {
  /**
   * Id
   */
  id?: string;
  /**
   * Related Location Id
   */
  relatedLocationId: string;
  /**
   * Start date time
   */
  startDateTime?: string;
  /**
   * End date time
   */
  endDateTime?: string;
}
