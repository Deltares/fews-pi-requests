/* tslint:disable */

/**
 * Web OC Configuration Response
 */
export interface WebOcConfigurationResponse {
  /**
   * WebOcComponents
   */
  components: (
    | WebOcDataViewerConfig
    | WebOcSpatialDisplayConfig
    | WebOcSchematicStatusDisplayConfig
    | WebOcTimeSeriesDisplayConfig
    | WebOcSystemMonitorConfig
    | WebOcArchiveDisplayConfig
    | WebOcTopologyDisplayConfig
  )[];
  general: WebOcGeneralConfig;
}
/**
 * Data Viewer Configuration
 */
export interface WebOcDataViewerConfig {
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
}
/**
 * Time Series Display Configuration
 */
export interface WebOcTimeSeriesDisplayConfig {
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
   * Set to true when edit permissions are allowed
   */
  editPermissions?: boolean;
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
}
/**
 * Archive Display Configuration
 */
export interface WebOcArchiveDisplayConfig {
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
}
export interface WebOcGeneralConfig {
  title?: string;
  icons?: WebOcIconsConfig;
  login?: WebOcLoginConfig;
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
