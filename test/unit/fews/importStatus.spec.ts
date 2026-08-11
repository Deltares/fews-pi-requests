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

    it("returns items with the correct fields", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/import/status?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
        const results = await provider.getImportStatus();
        const item = results.importStatus[0];

        expect(item.mcId).toBe("nlrimc00");
        expect(item.directory).toBe("https://matroos.rws.nl");
        expect(item.dataFeed).toBe("1_BOS-Brabant_verwachting");
        expect(item.lastSuccessfulTime).toBe("2022-09-21T03:00:10Z");
        expect(item.lastSuccessfulFile).toBe("2022-09-20 22:30:00:000");
        expect(item.filesSuccessfulCount).toBe(1);
        expect(item.filesFailedCount).toBe(0);
        expect(item.lastSuccessfulTimeBackgroundColor).toBe("#d0e9c6");
        expect(item.status).toBe("success");
    });
});
