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
  /**
   * Configure an icon from the IconFiles config folder
   */
  icon?: string;
  /**
   * The id of the icon to use, for example an mdi icon
   */
  iconId?: string;
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
  icon?: string;
  iconId?: string;
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
  icon?: string;
  iconId?: string;
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
  /**
   * Enable the task runs button in the topology display
   */
  enableTaskRuns?: boolean;
  /**
   * Enable the task runs button in the topology display
   */
  showActiveThresholdCrossingsForFilters?: boolean;
  icon?: string;
  iconId?: string;
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
export interface WebOcGeneralConfig {
  title?: string;
  defaultComponent?: string;
  customStyleSheet?: string;
  splashScreen?: string;
  helpMenu?: HelpMenuConfig;
  taskMenu?: TaskMenuConfig;
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
  timeSettings?: TimeSettingsViewPeriodPresets;
  agreeToTermsAndConditions?: TermsAndConditions;
  manifestFile?: string;
  mapLayerConfig?: MapLayerConfig;
  sidePanel?: SidePanelConfig;
}
export interface HelpMenuConfig {
  url?: HelpMenuConfigUrl[];
  path?: HelpMenuConfigPath[];
}
export interface HelpMenuConfigUrl {
  name?: string;
  url?: string;
}
export interface HelpMenuConfigPath {
  name?: string;
  path?: string;
}
export interface TaskMenuConfig {
  enabled?: boolean;
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
/**
 * View Period Presets
 */
export interface TimeSettingsViewPeriodPresets {
  /**
   * View period presets
   */
  viewPeriodPresets?: TimeSettingsViewPeriodPreset[];
}
/**
 * View Period
 */
export interface TimeSettingsViewPeriodPreset {
  /**
   * Unit of the view period
   */
  unit: "second" | "minute" | "hour" | "day" | "week";
  /**
   * Label of the view period
   */
  label: string;
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
 * Set to true if the user has to agree to the terms and conditions before using the application
 */
export interface TermsAndConditions {
  /**
   * Enable terms and conditions
   */
  enabled?: boolean;
}
/**
 * Map layer config options
 */
export interface MapLayerConfig {
  /**
   * Map layers
   */
  mapLayers: MapLayer[];
  /**
   * The default map for light mode
   */
  defaultLightModeMapLayerId?: string;
  /**
   * The default map for dark mode
   */
  defaultDarkModeMapLayerId?: string;
  [k: string]: unknown;
}
/**
 * Map layer
 */
export interface MapLayer {
  /**
   * id of the layer
   */
  id?: string;
  /**
   * name of the layer
   */
  name?: string;
  /**
   * This can be an absolute url when the file is externally hosted, if the file is in WebResourcesFiles then it should be a relative url
   */
  styleJsonFile?: string;
  /**
   * Definition of where the layer should be inserted, if nothing is defined the wms layer placed on top of all layers.
   */
  insertWmsBeforeLayerId?: string;
  /**
   * Define an icon for the map layer.
   */
  iconId?: string;
}
/**
 * SidePanel config options
 */
export interface SidePanelConfig {
  taskOverview?: SidePanelTaskOverviewConfig;
  nonCurrentData?: SidePanelNonCurrentDataConfig;
  importStatus?: SidePanelImportStatusConfig;
  exportStatus?: SidePanelExportStatusConfig;
  runTask?: SidePanelRunTaskConfig;
  documentFile?: SidePanelDocumentFileConfig;
  logDisplay?: SidePanelLogDisplayConfig;
}
/**
 * SidePanel Task Overview config options
 */
export interface SidePanelTaskOverviewConfig {
  /**
   * enable
   */
  enabled?: boolean;
}
/**
 * SidePanel Non Current Data config options
 */
export interface SidePanelNonCurrentDataConfig {
  /**
   * enable
   */
  enabled?: boolean;
}
/**
 * SidePanel Import Status config options
 */
export interface SidePanelImportStatusConfig {
  /**
   * enable
   */
  enabled?: boolean;
}
/**
 * SidePanel Export Status config options
 */
export interface SidePanelExportStatusConfig {
  /**
   * enable
   */
  enabled?: boolean;
}
/**
 * SidePanel Run Task config options
 */
export interface SidePanelRunTaskConfig {
  /**
   * enable
   */
  enabled?: boolean;
}
/**
 * SidePanel Document File config options
 */
export interface SidePanelDocumentFileConfig {
  /**
   * enable
   */
  enabled?: boolean;
}
/**
 * SidePanel log dispaly config options
 */
export interface SidePanelLogDisplayConfig {
  /**
   * enable
   */
  enabled?: boolean;
  /**
   * log display id
   */
  logDisplayId: string;
}
