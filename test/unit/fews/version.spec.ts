import {PiWebserviceProvider} from '../../../src'

import expectedResponse from '../mock/version.json'
import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";

describe("version", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/version?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const results = await provider.getVersion();
        expect(results).toStrictEqual(expectedResponse);
        expect(results.version.implementation).toBe('2017.02');
        expect(results.version.buildNumber).toBe(12345);
        expect(results.version.buildTime).toBe('2017-10-31T23:00:00Z');
        expect(results.version.buildType).toBe('stable');
        // just a demo
    });
});
