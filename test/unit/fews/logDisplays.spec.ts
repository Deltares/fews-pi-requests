import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'
import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import expectedResponse from '../mock/logDisplays.json'
import { LogDisplaysFilter } from '../../../src';

describe("logDisplays", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("logdisplays json response", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/logdisplays?logDisplayId=admin.log", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: LogDisplaysFilter = {
            logDisplayId: "admin.log"
        }
        const results = await provider.getLogDisplays(filter);
        expect(results).toStrictEqual(expectedResponse);
        expect("logDisplays" in results).toBe(true);
        expect(results?.logDisplays?.length).toBe(2);
    });
});
