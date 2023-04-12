import 'cross-fetch/polyfill';
import fetchMock from 'fetch-mock';
import expectedResponse from '../mock/productsMetaData.json'
import {PiArchiveWebserviceProvider} from "../../../src/piArchiveWebserviceProvider";
import { ProductsMetaDataFilter } from '../../../src';

describe("archive/productsMetadata", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets productsMetadata", async function () {
        fetchMock.mock('https://mock.dev/fewswebservices/rest/fewspiservice/v1/archive/productsmetadata?startForecastTime=2022-12-12T20%3A30%3A00Z&endForecastTime=2022-12-14T20%3A30%3A00Z&attribute(area_id)=meren', {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiArchiveWebserviceProvider("https://mock.dev/fewswebservices")
        const filter: ProductsMetaDataFilter = {
            startForecastTime: "2022-12-12T20:30:00Z",
            endForecastTime: "2022-12-14T20:30:00Z",
            attribute: {
                'area_id': 'meren'
            }
        }
        const results = await provider.getProductsMetaData(filter);
        expect("productsMetadata" in results).toBe(true)
        expect(results.productsMetadata.length).toBe(2)
        expect(results).toStrictEqual(expectedResponse);
    });
});
