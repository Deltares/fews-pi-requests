import {PiWebserviceProvider} from '../../../src'

import expectedResponse from '../mock/timeSteps.json'
import fetchMock from "fetch-mock";

import { describe, it, expect } from 'vitest';

describe("time steps", function () {    it("it returns 2 timesteps with correct types", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/timesteps", {
            status: 200,
            body: expectedResponse
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const results = await provider.getTimeSteps({});
        expect(results).toStrictEqual(expectedResponse);
        expect("timeSteps" in results).toBe(true);
        expect(results.timeSteps?.length).toBe(2);
        expect(results.timeSteps?.[0].id).toBe("PT1D");
        expect(results.timeSteps?.[0].label).toBe("Day");
    });
});
