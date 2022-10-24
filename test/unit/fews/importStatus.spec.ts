import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'

import expectedResponse from '../mock/importStatus.json'
import {ImportStatusResponse} from "../../../src/response";
import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";

describe("import/status", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/import/status?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const results: ImportStatusResponse = await provider.getImportStatus();
        expect(results).toStrictEqual(expectedResponse);
        expect("importStatus" in results).toBe(true);
        expect(results.importStatus.length).toBe(87);
    });
});
