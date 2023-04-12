
import { absoluteUrl, filterToParams } from "./utils/index.js";
import type {
    ArchiveLocationsFilter,
    AttributesFilter,
    ExternalForecastsFilter,
    ParametersFilter,
    ProductsMetaDataFilter
} from "./requestParameters";
import type {
    ArchiveAreas,
    ArchiveAttributes,
    ArchiveExternalNetCDFStorageForecasts,
    ArchiveLocations,
    ArchiveParameters,
    ArchiveProductsMetadata
} from "./response";
import { DocumentFormat } from "./requestParameters/index.js";
import { PiRestService } from "@deltares/fews-web-oc-utils";
import type {TransformRequestFunction} from "@deltares/fews-web-oc-utils";
import { BaseFilter } from "./requestParameters/baseFilter";
import { ArchiveSources } from "./response/archivesources";

const attributesForKey: { [key: string]: string } = {
    parameterIds: 'long_name',
}

export class PiArchiveWebserviceProvider {
    private baseUrl: URL
    private maxUrlLength?: number
    readonly API_ENDPOINT = 'rest/fewspiservice/v1';
    private webservice: PiRestService;

    addPiJsonFormat(queryParameters: string): string {
        const preFix = queryParameters.length == 0 ? "?" : "&";
        return queryParameters + preFix + "documentFormat=" + DocumentFormat.PI_JSON;
    }

    /**
     * Constructor for PiArchiveWebserviceProvider
     *
     * @param url the base url where the PI servive is available
     * @param {Object} [options] Optional constructor options
     * @param {number} [options.maxUrlLength] A number that specifies the maximum length of the URL. If the URL length exceeds this value, the requests will be split up.
     * @param {TransformRequestFunction} [options.transformRequestFn] A function that can be used to modify the Request
     * before it is sent to the server. This function takes a Request as a parameter and returns the modified Request.
     * If this option is not specified, the Request will be sent as is.
     */
    constructor(url: string, options: {maxUrlLength?: number; transformRequestFn?: TransformRequestFunction} = {}) {
        if (!url.endsWith("/")) {
            url += "/"
        }
        this.baseUrl = absoluteUrl(url)
        this.maxUrlLength = options.maxUrlLength ?? Infinity;
        this.webservice = new PiRestService(url, options.transformRequestFn);
    }

    /**
     * Request parameters
     *
     * @param filter an object with request query parameters
     * @returns Parameters PI API response
     */
    async getParameters(filter: ParametersFilter): Promise<ArchiveParameters> {
        const url = this.parametersUrl(filter);
        const res = await this.webservice.getData<ArchiveParameters>(url.toString());
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
    async getLocations(filter: ArchiveLocationsFilter): Promise<ArchiveLocations> {
        const url = this.locationsUrl(filter);
        const res = await this.webservice.getData<ArchiveLocations>(url.toString());
        return res.data;
    }

    /**
     * Construct URL for locations request
     *
     * @param filter an object with request query parameters
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
     * Request areas from the archive
     *
     * @param filter an object with request query parameters
     * @returns ArchiveAreas PI API response
     */
    async getAreas(filter: BaseFilter): Promise<ArchiveAreas> {
        const url = this.areasUrl(filter);
        const res = await this.webservice.getData<ArchiveAreas>(url.toString());
        return res.data;
    }

    /**
     * Construct URL for archive areas request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    areasUrl(filter: BaseFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/areas${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Request sources from the archive
     *
     * @param filter an object with request query parameters
     * @returns ArchiveSources PI API response
     */
    async getSources(filter: BaseFilter): Promise<ArchiveSources> {
        const url = this.sourcesUrl(filter);
        const res = await this.webservice.getData<ArchiveSources>(url.toString());
        return res.data;
    }

    /**
     * Construct URL for archive sources request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    sourcesUrl(filter: BaseFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/sources${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Request attributes
     *
     * @param filter an object with request query parameters
     * @returns Attributes PI API response
     */
    async getAttributes(filter: AttributesFilter): Promise<ArchiveAttributes> {
        const url = this.attributesUrl(filter);
        const res = await this.webservice.getData<ArchiveAttributes>(url.toString());
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
    async getExternalForecasts(filter: ExternalForecastsFilter): Promise<ArchiveExternalNetCDFStorageForecasts> {
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
        const filterWithDefaults = { ...mappedFilter, ...defaults }
        const url = this.externalForecastsUrl(filterWithDefaults)
        const res = await this.webservice.getData<ArchiveExternalNetCDFStorageForecasts>(url.toString());
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

    /**
     * Request product metadata from archive
     *
     * @param filter an object with request query parameters
     * @returns ProductsMetaData PI API response
     */
    async getProductsMetaData(filter: ProductsMetaDataFilter): Promise<ArchiveProductsMetadata> {
        const queryParameters = filterToParams(filter);
        const url = this.productsMetaDataUrl(queryParameters);
        const res = await this.webservice.getData<ArchiveProductsMetadata>(url.toString());
        return res.data;
    }

    /**
     * Construct URL for locations request
     *
     * @param queryParameters query string
     * @returns complete url for making a request
     */
    productsMetaDataUrl(queryParameters: string): URL {
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/productsmetadata${queryParameters}`,
            this.baseUrl
        )
    }
}
