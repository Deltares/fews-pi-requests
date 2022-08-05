import {PiWebserviceProvider} from '../../src/piWebserviceRequests'

import expectedResponse from './mock/moduleRunTimes.json'
import {ModuleRuntimesResponse} from "../../src/response";
import 'cross-fetch/polyfill';
import fetchMock from 'fetch-mock';
import {ModuleRuntimesFilter} from "../../src/requestParameters/moduleRunTimesFilter";
import {DocumentFormat} from "../../src";

describe("moduleruntimes", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.mock("https://mock.dev/fewswebservices/rest/fewspiservice/v1/tasks/moduleruntimes?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: ModuleRuntimesFilter = {
            documentFormat: DocumentFormat.PI_JSON,
        }
        const results: ModuleRuntimesResponse = await provider.getModuleRuntimes(filter);
        expect(results).toStrictEqual(expectedResponse);
        expect("moduleRunTimes" in results).toBe(true)
        expect(results.moduleRunTimes.length).toBe(16)
    });
});
