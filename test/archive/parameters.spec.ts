import {PiWebserviceProvider} from '../../src/piWebserviceRequests'
import {ParametersFilter, DocumentFormat} from '../../src/requestParameters'
import {ParametersResponse} from '../../src/response'
import 'cross-fetch/polyfill';
import fetchMock from 'fetch-mock';

import expectedResponse from './mock/parameters.json'

describe("archive/parameters", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.mock("https://mock.dev/fewswebservices/rest/fewspiservice/v1/archive/parameters?documentFormat=PI_JSON&locationIds=delfzijl", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
        const filter: ParametersFilter = {
            documentFormat: DocumentFormat.PI_JSON,
            locationIds: "delfzijl"
        }
        const results: ParametersResponse = await provider.getParameters(filter);
        expect(results).toStrictEqual(expectedResponse);
        expect("parameters" in results).toBe(true);
        expect(results.parameters.length).toBe(13);
    });
});
