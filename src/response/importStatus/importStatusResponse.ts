/* tslint:disable */

/**
 * ImportStatusResponse PI_JSON
 */
export interface ImportStatusResponse {
  importStatus: ImportStatus[];
  [k: string]: unknown;
}
export interface ImportStatus {
  mcId: string;
  taskRunId?: string;
  workflowId?: string;
  workflowName?: string;
  directory?: string;
  suspended: boolean;
  dataFeed: string;
  dataFeedName?: string;
  dataFeedDescription?: string;
  lastImportTime: string;
  lastFileImported: string;
  fileRead: number;
  fileFailed: number;
  lastImportTimeBackgroundColor: string;
}
