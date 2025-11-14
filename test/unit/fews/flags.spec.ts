import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'

import fetchMock from "fetch-mock";
import expectedFlagsResponse from '../mock/flags.json'

import { describe, it, expect } from 'vitest';

describe("/flags", function () {    it("test flags", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/flags", {
            status: 200,
            body: JSON.stringify(expectedFlagsResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
        const response = await provider.getFlags();
        expect(response).toStrictEqual(expectedFlagsResponse);
        expect(response.flags?.length).toBe(14)
        if (response.flags && response.flags.length == 14) {
            expect(response.flags[0].flag).toBe("0")
            expect(response.flags[0].source).toBe("ORIGINAL")
            expect(response.flags[0].quality).toBe("RELIABLE")
            expect(response.flags[0].name).toBe( "original reliable")
        }
    })
});
