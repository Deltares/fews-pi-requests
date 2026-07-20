/* tslint:disable */

/**
 * ExportStatusResponse PI_JSON
 */
export interface ExportStatusResponse {
  exportStatus: ExportStatus[];
  [k: string]: unknown;
}
export interface ExportStatus {
  mcId: string;
  workflowId?: string;
  taskRunId?: string;
  workflowName?: string;
  suspended?: boolean;
  directory?: string;
  dataFeed: string;
  dataFeedName?: string;
  dataFeedDescription?: string;
  lastExportTime?: string;
  lastFileExported: string;
  fileExported: number;
  fileFailed: number;
  lastExportTimeBackgroundColor?: string;
}