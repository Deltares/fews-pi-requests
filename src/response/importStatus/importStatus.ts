export interface ImportStatus {
    mcId?: string;
    directory?: string;
    dataFeed?: string;
    lastImportTime?: string;
    lastFileImported?: string;
    fileRead?: number;
    fileFailed?: number;
    lastImportTimeBackgroundColor?: string;
}