/* tslint:disable */

/**
 * WebOCDashboardsResponse PI_JSON
 */
export interface WebOCDashboardsResponse {
  dashboards?: WebOCDashboard[];
}
export interface WebOCDashboard {
  /**
   * the id of the dashboard
   */
  id: string;
  /**
   * Name of the dashboard
   */
  name?: string;
  /**
   * CSS template to be used with the dashboard
   */
  cssTemplate: string;
  groups?: WebOCDashboardGroup[];
}
export interface WebOCDashboardGroup {
  elements?: WebOCDashboardElement[];
}
export interface WebOCDashboardElement {
  /**
   * the id of the grid template area
   */
  gridTemplateArea: string;
  items?: WebOCDashboardItem[];
}
export interface WebOCDashboardItem {
  /**
   * the id of the topology node
   */
  topologyNodeId: string;
  /**
   * The Web OC component to display
   */
  component:
    | "map"
    | "schematic-status-display"
    | "charts"
    | "report"
    | "system-monitor"
    | "dynamic-report-display"
    | "log-display"
    | "data-download-display"
    | "whatif-display";
  /**
   * The component settings to use
   */
  componentSettingsId?: string;
  /**
   * The action ids available to the component
   */
  actionIds?: string[];
}
