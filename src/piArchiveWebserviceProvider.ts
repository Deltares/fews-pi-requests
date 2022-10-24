import PiRestService from "./restservice/piRestService";
import {absoluteUrl, filterToParams} from "./utils";
import {
    ArchiveLocationsFilter,
    AttributesFilter,
    DocumentFormat,
    ExternalForecastsFilter,
    ParametersFilter
} from "./requestParameters";
import {AttributesResponse, ExternalForecastsResponse, LocationsResponse, ParametersResponse} from "./response";

const attributesForKey: { [key: string]: string } = {
    parameterIds: 'long_name',
}

export class PiArchiveWebserviceProvider {
    baseUrl: URL
    maxUrlLength?: number
    readonly API_ENDPOINT = 'rest/fewspiservice/v1';
    webservice: PiRestService;

    addPiJsonFormat(queryParameters: string): string {
        const preFix = queryParameters.length == 0 ? "?" : "&";
        return queryParameters + preFix + "documentFormat=" + DocumentFormat.PI_JSON;
    }

    /**
     * Constructor for PiArchiveWebserviceProvider
     *
     * @param url the base url where the PI servive is available
     */
    constructor(url: string, maxUrlLength?: number) {
        if (!url.endsWith("/")) {
            url += "/"
        }
        this.baseUrl = absoluteUrl(url)
        this.maxUrlLength = maxUrlLength;
        this.webservice = new PiRestService(url);
    }

    /**
     * Request parameters
     *
     * @param filter an object with request query parameters
     * @returns Parameters PI API response
     */
    async getParameters(filter: ParametersFilter): Promise<ParametersResponse> {
        const queryParameters = filterToParams(filter);
        const url = this.parametersUrl(queryParameters);
        const res = await this.webservice.getData<ParametersResponse>(url.toString());
        return res.data;
    }

    /**
     * Construct URL for parameters request
     *
     * @param queryParameters query string
     * @returns complete url for making a request
     */
    parametersUrl(queryParameters: string): URL {
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/parameters${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Request locations from the archive
     *
     * @param filter an object with request query parameters
     * @returns Locations PI API response
     */
    async getLocations(filter: ArchiveLocationsFilter): Promise<LocationsResponse> {
        const queryParameters = filterToParams(filter);
        const url = this.locationsUrl(queryParameters);
        const res = await this.webservice.getData<LocationsResponse>(url.toString());
        return res.data;
    }

    /**
     * Construct URL for locations request
     *
     * @param queryParameters query string
     * @returns complete url for making a request
     */
    locationsUrl(queryParameters: string): URL {
        const path = "archive/locations";
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/${path}${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Request attributes
     *
     * @param filter an object with request query parameters
     * @returns Attributes PI API response
     */
    async getAttributes(filter: AttributesFilter): Promise<AttributesResponse> {
        const queryParameters = filterToParams(filter);
        const url = this.attributesUrl(queryParameters);
        const res = await this.webservice.getData<AttributesResponse>(url.toString());
        return res.data;
    }

    /**
     * Construct URL for attribute request
     *
     * @param queryParameters query string
     * @returns complete url for making a request
     */
    attributesUrl(queryParameters: string): URL {
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/attributes${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Request external forecasts
     *
     * @param filter an object with request query parameters
     * @returns External Forecasts PI API response
     */
    async getExternalForecasts(filter: ExternalForecastsFilter): Promise<ExternalForecastsResponse> {
        const mappedFilter: { [key: string]: unknown } = {}
        for (const [key, value] of Object.entries(filter)) {
            if (key in Object.keys(attributesForKey)) {
                mappedFilter[attributesForKey[key]] = value
            } else {
                mappedFilter[key] = value
            }
        }
        const defaults: ExternalForecastsFilter = {
            documentFormat: DocumentFormat.PI_JSON,
        }
        const filterWithDefaults = {...mappedFilter, ...defaults}
        const queryParameters = filterToParams(filterWithDefaults)
        const url = this.externalForecastsUrl(queryParameters)
        const res = await this.webservice.getData<ExternalForecastsResponse>(url.toString());
        return res.data;
    }

    /**
     * Construct URL for external forecast request
     *
     * @param queryParameters query string
     * @returns complete url for making a request
     */
    externalForecastsUrl(queryParameters: string): URL {
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/netcdfstorageforecasts${queryParameters}`,
            this.baseUrl
        )
    }


}