import {PiWebserviceProvider} from '../../src/piWebserviceRequests'
import {AttributesResponse} from '../../src/response'
import 'cross-fetch/polyfill';
import fetchMock from 'fetch-mock';
import expectedResponse from './mock/attributes.json'
import {AttributesFilter} from "../../src/requestParameters/attributesFilter";
import {DocumentFormat} from "../../src/requestParameters/documentFormat";

describe("archive/attributes", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.mock('https://mock.dev/fewswebservices/rest/fewspiservice/v1/archive/attributes?documentFormat=PI_JSON&parameterIds=waterlevel_stat_bias&locationIds=delfzijl&attributes=source', {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: AttributesFilter = {
            documentFormat: DocumentFormat.PI_JSON,
            parameterIds: "waterlevel_stat_bias",
            locationIds: "delfzijl",
            attributes: 'source',
        }
        const results: AttributesResponse = await provider.getAttributes(filter) as AttributesResponse;
        expect("archiveAttributes" in results).toBe(true)
        expect(results.archiveAttributes.length).toBe(5)
        expect(results).toStrictEqual(expectedResponse);
    });
});
