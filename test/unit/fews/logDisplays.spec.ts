import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'
import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import expectedResponse from '../mock/logDisplays.json'

describe("logDisplays", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("logdisplays json response", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/logdisplays", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const results = await provider.getLogDisplays();
        expect(results).toStrictEqual(expectedResponse);
        expect("logDisplays" in results).toBe(true);
        expect(results?.logDisplays?.length).toBe(2);
    });
});
