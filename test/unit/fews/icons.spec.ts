import {PiWebserviceProvider} from '../../../src/piWebserviceProvider.js'

import expectedResponse from '../mock/version.json'
import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";

describe("icon resources", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("get icon resource", async function () {
        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
        const results = await provider.resourcesIconsUrl('meteo_site_data.gif')
        expect(results.toString()).toStrictEqual("https://mock.dev/fewswebservices/rest/fewspiservice/v1/resources/icons/meteo_site_data.gif");

        const resultsAbsolute = await provider.resourcesIconsUrl('https://mydomain.com/css/style.css')
        expect(resultsAbsolute.toString()).toStrictEqual("https://mydomain.com/css/style.css");

        const resultsHttpsPath = await provider.resourcesIconsUrl('https/css/style.css')
        expect(resultsHttpsPath.toString()).toStrictEqual("https://mock.dev/fewswebservices/rest/fewspiservice/v1/resources/icons/https/css/style.css");

        const resultsHttpPath = await provider.resourcesIconsUrl('http/css/style.css')
        expect(resultsHttpPath.toString()).toStrictEqual("https://mock.dev/fewswebservices/rest/fewspiservice/v1/resources/icons/http/css/style.css");

    })
})