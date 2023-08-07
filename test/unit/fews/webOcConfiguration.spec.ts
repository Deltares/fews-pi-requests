import {PiWebserviceProvider} from '../../../src/piWebserviceProvider.js'

import expectedResponse from '../mock/webOcConfiguration.json'
import expectedPublicResponse from '../mock/webOcPublicConfiguration.json'
import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import {WebOcArchiveDisplayConfig} from "../../../src";

describe("webOcConfig", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("tests fetch Web OC config", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/weboc/config?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
        const results = await provider.getWebOcConfiguration();
        expect(results).toStrictEqual(expectedResponse);
        expect(results.general.title).toBe('my title');
        if (results.components[0].type === "ArchiveDisplay") {
            const archiveDisplay: WebOcArchiveDisplayConfig = results.components[0];
            expect(archiveDisplay.id).toBe("archiveDisplay")
            expect(archiveDisplay.title).toBe("My Archive Display")
        }
        expect(results.components.length).toBe(6)
    });

    it("tests fetch Web OC Public config", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/weboc/config/public?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedPublicResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
        const results = await provider.getWebOcPublicConfiguration();
        expect(results).toStrictEqual(expectedPublicResponse);
        expect(results.general.title).toBe('my public title');
        expect(results.components).toBeUndefined();
    })
});
