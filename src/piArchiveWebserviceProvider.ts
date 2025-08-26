
import { absoluteUrl, filterToParams, splitUrl } from "./utils/index.js";
import type {
    ArchiveLocationsFilter,
    AttributesFilter,
    ExternalForecastsFilter,
    ProductsMetaDataFilter,
    TimeSeriesFilter
} from "./requestParameters";
import type {
    ArchiveAreas,
    ArchiveAttributes,
    ArchiveExternalNetCDFStorageForecasts,
    ArchiveLocations,
    ArchiveParameters,
    ArchiveProductsMetadata,
    TimeSeriesResponse
} from "./response";
import { DocumentFormat } from "./requestParameters/index.js";
import { PiRestService, PlainTextParser, RequestOptions } from "@deltares/fews-web-oc-utils";
import type {TransformRequestFunction} from "@deltares/fews-web-oc-utils";
import { BaseFilter } from "./requestParameters/baseFilter";
import { ArchiveSources } from "./response/archivesources";
import { ArchiveParametersFilter } from "./requestParameters/archiveParametersFilter";
import { ProductAttributesFilter as ProductAttributesFilter } from "./requestParameters/productAttributesFilter.js";

const attributesForKey: { [key: string]: string } = {
    parameterIds: 'long_name',
}

export class PiArchiveWebserviceProvider {
    private baseUrl: URL
    private maxUrlLength: number
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
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getParameters(filter: ArchiveParametersFilter): Promise<ArchiveParameters> {
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
    parametersUrl(filter: ArchiveParametersFilter): URL {
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
     * @throws 'Fetch Error' if fetch result is not ok
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
     * @throws 'Fetch Error' if fetch result is not ok
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
     * @throws 'Fetch Error' if fetch result is not ok
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
     * @throws 'Fetch Error' if fetch result is not ok
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
     * Construct URL for attribute request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    productsAttributesUrl(filter: ProductAttributesFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/archive/products/attributes${queryParameters}`,
            this.baseUrl
        )
    }

    /**
     * Add or update product attributes
     *
     * @param metadataPath
     * @param attributes
     * @returns Attributes PI API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async postProductAttributes(filter: ProductAttributesFilter): Promise<string> {
        const url = this.productsAttributesUrl(filter);
        const headers = {
                    'Content-Type': "application/json"
                }
        const parser = new PlainTextParser<string>();
        const requestOptions = new RequestOptions();
        requestOptions.relativeUrl = !url.toString().startsWith("http")
        const res = await this.webservice.postDataWithParser<string>(url.toString(), requestOptions, parser, {}, headers);
        return res.data;
    }

    /**
     * Request external forecasts
     *
     * @param filter an object with request query parameters
     * @returns External Forecasts PI API response
     * @throws 'Fetch Error' if fetch result is not ok
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
     * @throws 'Fetch Error' if fetch result is not ok
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

    /**
     * Request Time Series
     *
     * @param filter an object with request query parameters
     * @returns Time Series PI API response
     * @throws 'Fetch Error' if fetch result is not ok
     */
    async getTimeSeries(filter: TimeSeriesFilter): Promise<TimeSeriesResponse> {
        const defaults: TimeSeriesFilter = {
            documentFormat: DocumentFormat.PI_JSON,
        }
        const filterWithDefaults = {...defaults, ...filter};
        const url = this.timeSeriesUrl(filterWithDefaults);
        if (url.toString().length <= this.maxUrlLength) {
            const res = await this.webservice.getData<TimeSeriesResponse>(url.toString());
            return res.data;
        } else {
            const urls = splitUrl(url, this.maxUrlLength);
            const promises = urls.map((u) => this.webservice.getData<TimeSeriesResponse>(u.toString()));
            return Promise.all(promises).then((responses) => {
                const response = responses[0].data;
                if (response.timeSeries !== undefined) {
                    for (let i = 1; i < responses.length; i++) {
                        if (responses[i].data.timeSeries === undefined) continue
                        response.timeSeries.push(...responses[i].data.timeSeries || [])
                    }
                }
                return response;
            })
        }
    }

    /**
     * Construct URL for time series request
     *
     * @param filter an object with request query parameters
     * @returns complete url for making a request
     */
    timeSeriesUrl(filter: TimeSeriesFilter): URL {
        const queryParameters = filterToParams(filter)
        return new URL(
            `${this.baseUrl.pathname}${this.API_ENDPOINT}/timeseries${queryParameters}`,
            this.baseUrl
        )
    }
}
