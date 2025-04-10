import {PiWebserviceProvider} from '../../../src'

import 'cross-fetch/polyfill';
import expectedResponse from '../mock/timeSteps.json'
import fetchMock from "fetch-mock";

describe("time steps", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/timesteps", {
            status: 200,
            body: expectedResponse
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const results = await provider.getTimeSteps({});
        expect(results).toStrictEqual(expectedResponse);
    });
});
