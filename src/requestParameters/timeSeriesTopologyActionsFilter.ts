export interface TimeSeriesTopologyActionsFilter {
    // Topology node id
    nodeId: string;
    // Index of tie timeSeriesDisplay to show from the topology node.
    timeSeriesDisplayIndex: number;
    // (dateTime: yyyy-MM-ddTHH:mm:ssZ): Start time of search period that looks for time series values that lie within this period.
    startTime?: string;
    // (dateTime: yyyy-MM-ddTHH:mm:ssZ): End time of search period that looks for time series values that lie within this period.
    endTime?: string;
    timeZero?: string;
    // (boolean): Export values using display units.
    useDisplayUnits?: boolean;
    // (boolean): Convert values from relative location height to absolute height values.
    convertDatum?: boolean;
    // download as attachment
    downloadAsFile?: boolean
    documentFormat?: string;
    documentVersion?: string;

}