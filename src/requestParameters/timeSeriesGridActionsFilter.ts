export interface TimeSeriesGridActionsFilter {
  layers: string;
  x: number;
  y: number;
  startTime: string;
  endTime: string;
  bbox: number[];
  showVerticalProfile?: boolean;
  elevation?: number;
  crs?: string;
  externalForecastTime?: string;
  taskRunId?: string;
  ensembleId?: string;
  ensembleMemberId?: string;
  importFromExternalDataSource?: boolean;
  downloadAsFile?: boolean;
  useDisplayUnits?: boolean;
  documentFormat?: string;
  documentVersion?: string;
}
