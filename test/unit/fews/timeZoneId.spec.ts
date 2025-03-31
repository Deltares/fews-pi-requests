import {PiWebserviceProvider} from '../../../src'

import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";

describe("time zone id", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        const expectedResponse = "GMT"
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/timezoneid", {
            status: 200,
            body: expectedResponse
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const results = await provider.getTimeZoneId();
        expect(results).toStrictEqual(expectedResponse);
    });
});
