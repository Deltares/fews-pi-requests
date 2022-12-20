import 'cross-fetch/polyfill';
import fetchMock from 'fetch-mock';

import expectedResponse from '../mock/sources.json'
import {DocumentFormat} from "../../../src/requestParameters/documentFormat";
import {PiArchiveWebserviceProvider} from "../../../src/piArchiveWebserviceProvider";
import {BaseFilter} from "../../../src/requestParameters/baseFilter";

describe("archive/sources", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.mock("https://mock.dev/fewswebservices/rest/fewspiservice/v1/archive/sources?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiArchiveWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: BaseFilter = {
            documentFormat: DocumentFormat.PI_JSON
        }
        const results = await provider.getSources(filter);
        expect(results).toStrictEqual(expectedResponse);
        expect("sources" in results).toBe(true)
        expect(results.sources.length).toBe(1)
    });
});
