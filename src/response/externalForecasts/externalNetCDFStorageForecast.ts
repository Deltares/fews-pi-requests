import { NetCDFAttribute } from "./netcdfAtrribute";

export interface ExternalNetCDFStorageForecast {
    forecastTime: string;
    forecastAvailableTime: string;
    attributes?: NetCDFAttribute[];
}
