import 'cross-fetch/polyfill';
import { PiArchiveWebserviceProvider } from '../../src/piArchiveWebserviceProvider.js'
import type { ArchiveLocationsFilter } from '../../src/requestParameters/archiveLocationsFilter.js';
import type { AttributesFilter } from '../../src/requestParameters/attributesFilter.js';
import { DocumentFormat } from '../../src/requestParameters/documentFormat.js';
import type { ExternalForecastsFilter } from '../../src/requestParameters/externalForecastFilter.js';
import type { ParametersFilter } from '../../src/requestParameters/parametersFilter.js';
import type { ProductsMetaDataFilter } from '../../src/requestParameters/productsMetaDataFilter.js';


const baseUrl = process.env.TEST_ARCHIVE_URL ?? "";

describe("pi webservice provider", function () {
    it("get locations", async function () {
        const provider = new PiArchiveWebserviceProvider(baseUrl);
        const filter: ArchiveLocationsFilter = {
            documentFormat: DocumentFormat.PI_JSON
        }
        const res = await provider.getLocations(filter);
        expect(res.locations.length).toBeGreaterThan(0);
    })

    it("get parameters", async function () {
        const provider = new PiArchiveWebserviceProvider(baseUrl);
        const filter: ParametersFilter = {
            documentFormat: DocumentFormat.PI_JSON,
            attribute: {
                system: 'nz'
            }
        }
        const res = await provider.getParameters(filter);
        expect(res.parameters.length).toBeGreaterThan(0);
    })

    it("get external forecasts", async function () {
        const provider = new PiArchiveWebserviceProvider(baseUrl);
        const filter: ExternalForecastsFilter = {
            documentFormat: DocumentFormat.PI_JSON,
            requestedAttributes: ['source', 'verification_period'],
            startTime: "2022-12-01T00:00:00Z",
            endTime: "2022-12-14T00:00:00Z",
            attribute: {
                'long_name': 'waterlevel_stat_bias',
                system: 'nz'
            }
        };
        const res = await provider.getExternalForecasts(filter);
        expect(res.externalNetCDFStorageForecasts.length).toBeGreaterThan(0);
    })

    it("get attributes", async function () {

        const provider = new PiArchiveWebserviceProvider(baseUrl);
        const filter: AttributesFilter = {
            documentFormat: DocumentFormat.PI_JSON,
            attribute: {
                'long_name': 'Wave_he10_stat_bias',
                system: 'nz'
            }
        };
        const res = await provider.getAttributes(filter);
        expect(res.archiveAttributes.length).toBeGreaterThan(0);
    })

    it("get productsMetaData", async function () {

        const provider = new PiArchiveWebserviceProvider(baseUrl);
        const filter: ProductsMetaDataFilter = {
            startForecastTime: "2022-12-12T20:30:00Z",
            endForecastTime: "2022-12-14T20:30:00Z",
            attribute: {
                'area_id': 'meren'
            }
        }
        const res = await provider.getProductsMetaData(filter);
        expect(res.productsMetadata.length).toBeGreaterThan(0);
    });
})