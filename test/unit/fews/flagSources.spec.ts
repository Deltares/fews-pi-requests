import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'

import fetchMock from "fetch-mock";
import expectedFlagSourcesResponse from '../mock/flagSources.json'

import { describe, it, expect } from 'vitest';

describe("/flagsources", function () {    it("test flagSources", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/flagsources", {
            status: 200,
            body: JSON.stringify(expectedFlagSourcesResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const response = await provider.getFlagSources();
        expect(response).toStrictEqual(expectedFlagSourcesResponse);
        expect(response.flagSources?.length).toBe(20)
    })
});
