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

    set oath2Token(value: string) {
        this.webservice.oauth2Token = value;
    }

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
        const url = this.parametersUrl(filter);
        const res = await this.webservice.getData<ParametersResponse>(url.toString());
        return res.data;
    }

    /**
     * Construct URL for parameters request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
     parametersUrl(filter: ParametersFilter): URL {
        const queryParameters = filterToParams(filter)
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
        const url = this.locationsUrl(filter);
        const res = await this.webservice.getData<LocationsResponse>(url.toString());
        return res.data;
    }

    /**
     * Construct URL for locations request
     *
     * @param filter an object with request query parameters
     * @param useArchive whether to use the archive or not
     * @returns complete url for making a request
     */
     locationsUrl(filter: ArchiveLocationsFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/locations${queryParameters}`,
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
        const url = this.attributesUrl(filter);
        const res = await this.webservice.getData<AttributesResponse>(url.toString());
        return res.data;
    }

    /**
     * Construct URL for attribute request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
     attributesUrl(filter: AttributesFilter): URL {
        const queryParameters = filterToParams(filter)
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
        const url = this.externalForecastsUrl(filterWithDefaults)
        const res = await this.webservice.getData<ExternalForecastsResponse>(url.toString());
        return res.data;
    }

    /**
     * Construct URL for external forecast request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
     externalForecastsUrl(filter: ExternalForecastsFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/netcdfstorageforecasts${queryParameters}`,
            this.baseUrl
        )
    }
}
