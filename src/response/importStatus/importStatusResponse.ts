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
  dataFeed: string;
  lastImportTime: string;
  lastFileImported: string;
  fileRead: number;
  fileFailed: number;
  lastImportTimeBackgroundColor: string;
}
