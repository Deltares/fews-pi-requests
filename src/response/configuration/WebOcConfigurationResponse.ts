/* tslint:disable */

/**
 * Web OC Configuration Response
 */
export interface WebOcConfigurationResponse {
  /**
   * WebOcComponents
   */
  components: (
    | WebOcSpatialDisplayConfig
    | WebOcSchematicStatusDisplayConfig
    | WebOcSystemMonitorConfig
    | WebOcTopologyDisplayConfig
    | WebOcDataDownloadDisplayConfig
  )[];
  general: WebOcGeneralConfig;
}
/**
 * Spatial Display Configuration
 */
export interface WebOcSpatialDisplayConfig {
  /**
   * id of the component
   */
  id: string;
  /**
   * Type of the component
   */
  type: string;
  /**
   * Title of the component
   */
  title?: string;
  defaultPath?: SpatialDisplayDefaultPath;
  /**
   * Show in navigation menu.
   */
  showInNavigationMenu?: boolean;
}
/**
 * Default spatial display
 */
export interface SpatialDisplayDefaultPath {
  /**
   * Grid Plot id
   */
  gridPlotId: string;
}
/**
 * Schematic Status Display Configuration
 */
export interface WebOcSchematicStatusDisplayConfig {
  /**
   * id of the component
   */
  id: string;
  /**
   * Type of the component
   */
  type: string;
  /**
   * Title of the component
   */
  title?: string;
  defaultPath?: SchematicStatusDisplayDefaultPath;
  /**
   * Show in navigation menu.
   */
  showInNavigationMenu?: boolean;
}
/**
 * Default schematic status display
 */
export interface SchematicStatusDisplayDefaultPath {
  /**
   * groupId Id
   */
  groupId: string;
  /**
   * Panel Id
   */
  panelId: string;
}
/**
 * System Monitor Configuration
 */
export interface WebOcSystemMonitorConfig {
  /**
   * id of the component
   */
  id: string;
  /**
   * Type of the component
   */
  type: string;
  /**
   * Title of the component
   */
  title?: string;
  /**
   * Show in navigation menu.
   */
  showInNavigationMenu?: boolean;
}
/**
 * Topology Display Configuration
 */
export interface WebOcTopologyDisplayConfig {
  /**
   * id of the component
   */
  id: string;
  /**
   * Type of the component
   */
  type: string;
  /**
   * Title of the component
   */
  title?: string;
  /**
   * If this option is set to true. The leaf nodes are not displayed in the topology tree but as buttons in map.
   */
  showLeafNodesAsButtons?: boolean;
  defaultPath?: TopologyDisplayDefaultPath;
  /**
   * Show in navigation menu.
   */
  showInNavigationMenu?: boolean;
}
/**
 * Default grid display
 */
export interface TopologyDisplayDefaultPath {
  /**
   * Node Id
   */
  nodeId: string;
}
/**
 * Data Download Display Configuration
 */
export interface WebOcDataDownloadDisplayConfig {
  /**
   * id of the component
   */
  id: string;
  /**
   * Type of the component
   */
  type: string;
  /**
   * Title of the component
   */
  title?: string;
  /**
   * Show in navigation menu.
   */
  showInNavigationMenu?: boolean;
}
export interface WebOcGeneralConfig {
  title?: string;
  defaultComponent?: string;
  customStyleSheet?: string;
  splashScreen?: string;
  icons?: WebOcIconsConfig;
  login?: WebOcLoginConfig;
  /**
   * set to false if it is also possible to use edit functionality
   */
  readonlyMode?: boolean;
  /**
   * Set to true if permissions are applied as used in the Permissions.xml and UserGroups.xml configurations. Als required if using OIDC integration with the web service.
   */
  permissionsEnabled?: boolean;
}
/**
 * Icons Configuration
 */
export interface WebOcIconsConfig {
  /**
   * URL or resource id from the WebResourceFiles folder or any of its sub folder
   */
  logo?: string;
  /**
   * URL or resource id from the WebResourceFiles folder or any of its sub folder
   */
  favicon?: string;
}
/**
 * Login Configuration
 */
export interface WebOcLoginConfig {
  /**
   * URL or resource id from the WebResourceFiles folder or any of its sub folder with the background image that will be used on the login screen
   */
  backgroundImage?: string;
}
