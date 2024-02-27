import {
  WebOcSchematicStatusDisplayConfig,
  WebOcSpatialDisplayConfig,
  WebOcSystemMonitorConfig,
  WebOcTopologyDisplayConfig
} from "../response";

export function isSchematicStatusDisplay(component: (
    | WebOcSpatialDisplayConfig
    | WebOcSchematicStatusDisplayConfig
    | WebOcSystemMonitorConfig
    | WebOcTopologyDisplayConfig
    )): component is WebOcSchematicStatusDisplayConfig {
  return component.type === 'SchematicStatusDisplay';
}

export function isTopologyDisplay(component: (
    | WebOcSpatialDisplayConfig
    | WebOcSchematicStatusDisplayConfig
    | WebOcSystemMonitorConfig
    | WebOcTopologyDisplayConfig
    )): component is WebOcTopologyDisplayConfig {
  return component.type === 'TopologyDisplay';
}

export function isSpatialDisplay(component: (
    | WebOcSpatialDisplayConfig
    | WebOcSchematicStatusDisplayConfig
    | WebOcSystemMonitorConfig
    | WebOcTopologyDisplayConfig
    )): component is WebOcSpatialDisplayConfig {
  return component.type === 'SpatialDisplay';
}

export function isSystemMonitor(component: (
    | WebOcSpatialDisplayConfig
    | WebOcSchematicStatusDisplayConfig
    | WebOcSystemMonitorConfig
    | WebOcTopologyDisplayConfig
    )): component is WebOcSystemMonitorConfig {
  return component.type === 'SystemMonitor';
}
