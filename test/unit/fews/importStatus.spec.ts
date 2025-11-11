import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'

import expectedResponse from '../mock/importStatus.json'
import fetchMock from "fetch-mock";

import { describe, it, expect } from 'vitest';

describe("import/status", function () {    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/import/status?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const results = await provider.getImportStatus();
        expect(results).toStrictEqual(expectedResponse);
        expect("importStatus" in results).toBe(true);
        expect(results.importStatus.length).toBe(87);
    });
});
