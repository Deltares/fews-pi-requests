import 'cross-fetch/polyfill';
import fetchMock from 'fetch-mock';

import expectedResponse from '../mock/areas.json'
import {DocumentFormat} from "../../../src/requestParameters/documentFormat";
import {PiArchiveWebserviceProvider} from "../../../src/piArchiveWebserviceProvider";
import {BaseFilter} from "../../../src/requestParameters/baseFilter";

describe("archive/areas", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.mock("https://mock.dev/fewswebservices/rest/fewspiservice/v1/archive/areas?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiArchiveWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: BaseFilter = {
            documentFormat: DocumentFormat.PI_JSON
        }
        const results = await provider.getAreas(filter);
        expect(results).toStrictEqual(expectedResponse);
        expect("areas" in results).toBe(true)
        expect(results.areas.length).toBe(1)
    });
});
