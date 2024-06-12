// FIXME: We are currently not extending from `BaseFilter`, because the endpoint
//        does not accept documentFormat as a query parameter, despite being
//        documented as such. If this is fixed, we should extend from
//        `BaseFilter`.
export interface TimeSeriesGridMaxValuesFilter {
   // Start time of search period that looks for timeseries values that are
   // within this period. If the start time doesn't match a timestamp of the
   // time series, the closest timestamp before the startTime, will also be
   // returned. Format: yyyy-MM-ddTHH:mm:ssZ
  startTime: string
  // End time of search period that looks for timeseries values that are within
  // this period. If the endTime doesn't match a timestamp of the time series,
  // the closest timestamp after the endTime, will also be returned. Format:
  // yyyy-MM-ddTHH:mm:ssZ
  endTime: string
  // Layer id (only one layer is supported and required) that matches the
  // gridPlot id as configured in the gridDisplay. Every gridPlot that has been
  // configured in the grid display configuration represents a WMS layer.
  layers: string
  // Convert values from relative location height to absolute height values.
  convertDatum?: boolean
  // Export values using display units.
  useDisplayUnits?: boolean
  // Since 2024.01. Set the name of the file without extension to download as an
  // attachment. Can be used in the testpage to avoid the response being
  // rendered in the browser.
  downloadAsFile?: string
}
