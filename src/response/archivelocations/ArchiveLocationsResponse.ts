/*tslint:disable*/

/**
 * ArchiveLocationsResponse PI_JSON
 */
export interface ArchiveLocations {
  /**
   * ArchiveLocation
   */
  locations: ArchiveLocation[];
}
export interface ArchiveLocation {
  locationId: string;
  shortName?: string;
  lat: string;
  lon: string;
}
