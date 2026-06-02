import {
  WebOcSchematicStatusDisplayConfig,
  WebOcSpatialDisplayConfig,
  WebOcSystemMonitorConfig,
  WebOcTopologyDisplayConfig
} from "../response";

type WebOcComponentConfig =
  | WebOcSpatialDisplayConfig
  | WebOcSchematicStatusDisplayConfig
  | WebOcSystemMonitorConfig
  | WebOcTopologyDisplayConfig;

export function isSchematicStatusDisplay(component: WebOcComponentConfig): component is WebOcSchematicStatusDisplayConfig {
  return component.type === 'SchematicStatusDisplay';
}

export function isTopologyDisplay(component: WebOcComponentConfig): component is WebOcTopologyDisplayConfig {
  return component.type === 'TopologyDisplay';
}

export function isSpatialDisplay(component: WebOcComponentConfig): component is WebOcSpatialDisplayConfig {
  return component.type === 'SpatialDisplay';
}

export function isSystemMonitor(component: WebOcComponentConfig): component is WebOcSystemMonitorConfig {
  return component.type === 'SystemMonitor';
}
