/* tslint:disable */

/**
 * Permissions PI_JSON
 */
export interface PermissionsResponse {
  permissions?: Permission[];
}
export interface Permission {
  /**
   * id of the permission
   */
  id: string;
  /**
   * True if the permission is assigned to the current user.
   */
  assigned: boolean;
}
