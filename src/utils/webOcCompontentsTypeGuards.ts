import {
  WebOcSchematicStatusDisplayConfig,
  WebOcSpatialDisplayConfig,
  WebOcSystemMonitorConfig,
  WebOcTopologyDisplayConfig,
  WebOcDataDownloadDisplayConfig
} from "../response";

export function isSchematicStatusDisplay(component: (
    | WebOcSpatialDisplayConfig
    | WebOcSchematicStatusDisplayConfig
    | WebOcSystemMonitorConfig
    | WebOcTopologyDisplayConfig
    | WebOcDataDownloadDisplayConfig
    )): component is WebOcSchematicStatusDisplayConfig {
  return component.type === 'SchematicStatusDisplay';
}

export function isDataDownloadDisplay(component: (
    | WebOcSpatialDisplayConfig
    | WebOcSchematicStatusDisplayConfig
    | WebOcSystemMonitorConfig
    | WebOcTopologyDisplayConfig
    | WebOcDataDownloadDisplayConfig
    )): component is WebOcDataDownloadDisplayConfig {
  return component.type === 'DataDownloadDisplay';
}

export function isTopologyDisplay(component: (
    | WebOcSpatialDisplayConfig
    | WebOcSchematicStatusDisplayConfig
    | WebOcSystemMonitorConfig
    | WebOcTopologyDisplayConfig
    | WebOcDataDownloadDisplayConfig
    )): component is WebOcTopologyDisplayConfig {
  return component.type === 'TopologyDisplay';
}

export function isSpatialDisplay(component: (
    | WebOcSpatialDisplayConfig
    | WebOcSchematicStatusDisplayConfig
    | WebOcSystemMonitorConfig
    | WebOcTopologyDisplayConfig
    | WebOcDataDownloadDisplayConfig
    )): component is WebOcSpatialDisplayConfig {
  return component.type === 'SpatialDisplay';
}

export function isSystemMonitor(component: (
    | WebOcSpatialDisplayConfig
    | WebOcSchematicStatusDisplayConfig
    | WebOcSystemMonitorConfig
    | WebOcTopologyDisplayConfig
    | WebOcDataDownloadDisplayConfig
    )): component is WebOcSystemMonitorConfig {
  return component.type === 'SystemMonitor';
}
