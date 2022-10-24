import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'

import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import {DisplayGroupsFilter} from "../../../src/requestParameters/DisplayGroupsFilter";
import {DisplayGroupsResponse} from "../../../src/response/displaygroups/displayGroupsResponse";
import expectedResponseDisplayGroups from '../mock/displayGroups.json'


describe("archive/locations", function () {

    afterAll(function () {
        fetchMock.restore();
    });

    it("test display groups", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/displaygroups?nodeId=test", {
            status: 200,
            body: JSON.stringify(expectedResponseDisplayGroups)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const filter = {} as DisplayGroupsFilter;
        filter.nodeId = "test";
        const response: DisplayGroupsResponse = await provider.getDisplayGroupsTimeSeriesInfo(filter);
        expect(response).toStrictEqual(expectedResponseDisplayGroups);
        expect(response.results.length).toBe(1);
        expect(response.results[0].requests.length).toBe(9);
    })
;
});
