import type { BaseTimeSeriesFilter } from "./baseTimeSeriesFilter";

export interface TimeSeriesGridFilter extends BaseTimeSeriesFilter {
    // (string, required): bounding box of map that is viewed in , separated EPSG:3857 format. The order of the coordinates is as follows: bottom left X, bottom left Y, top right X, top right Y. For example:
    // bbox=-1558755.612890017,4979850.04379049,1623657.8112034467,6709422.556884765
    bbox?: number[];
    // (boolean): Convert values from relative location height to absolute height values.
    convertDatum?: boolean;
    // (double): used for 3d data, like for example water depth, to get the timeseries of a grid point at a specific elevation. Since 2020.01.
    elevation?: number;
    // (dateTime format: yyyy-MM-ddTHH:mm:ssZ): Time value of external forecast time.
    externalForecastTime?: string;
    // (String): Used in combination with ensembleMemberId to identify a unique ensemble. Since 2020.01.
    ensembleId?: string;
    // (String): Used in combination with ensembleId to identify a unique ensemble. Since 2020.01.
    ensembleMemberId?: string;
    // (string, required): layerd id (only one layer is supported and required) that matches the gridPlot id as configured in the gridDisplay. Every gridPlot that has been configured in the grid display configuration represents a WMS layer. For more information, see the WMS Service documentation: FEWS Web Mapping Service with time support (WMS-T)
    layers?: string;
    // (boolean): Show vertical profile in case of 3D data. Since 2020.01.
    showVerticalProfile?: boolean;
    // (double, required): x postion on the map in EPSG:3857 format.
    x?: number;
    // (double, required): y postion on the map in EPSG:3857 format.
    y?: number;
}
