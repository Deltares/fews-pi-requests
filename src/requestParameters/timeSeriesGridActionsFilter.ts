
export interface timeSeriesGridActionsFilter {
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
  ensembleId?: string;
  ensembleMemberId?: string;
  importFromExternalDataSource?: boolean;
  documentFormat?: string;
  documentVersion?: string;
}