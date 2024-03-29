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
    })

    it("get icon resource with absolute path", async function () {
        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
        const resultsAbsolute = await provider.resourcesIconsUrl('https://mydomain.com/images/icon.png')
        expect(resultsAbsolute.toString()).toStrictEqual("https://mydomain.com/images/icon.png");
    })

    it("get icon resource with https in path", async function() {
        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
        const resultsHttpsPath = await provider.resourcesIconsUrl('https/images/icon.png')
        expect(resultsHttpsPath.toString()).toStrictEqual("https://mock.dev/fewswebservices/rest/fewspiservice/v1/resources/icons/https/images/icon.png");
    })

    it("get icon resource with http in path", async function() {
        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
        const resultsHttpPath = await provider.resourcesIconsUrl('http/images/icon.png')
        expect(resultsHttpPath.toString()).toStrictEqual("https://mock.dev/fewswebservices/rest/fewspiservice/v1/resources/icons/http/images/icon.png");
    })

})
