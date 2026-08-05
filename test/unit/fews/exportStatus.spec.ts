import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'

import expectedResponse from '../mock/exportStatus.json'
import fetchMock from "fetch-mock";

import { describe, it, expect } from 'vitest';

describe("export/status", function () {
    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/export/status?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const results = await provider.getExportStatus();
        expect(results).toStrictEqual(expectedResponse);
        expect("exportStatus" in results).toBe(true);
        expect(results.exportStatus.length).toBe(1);
    });
});
