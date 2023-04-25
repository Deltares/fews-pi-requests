import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'

import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import {TopologyActionsFilter} from "../../../src/requestParameters/TopologyActionsFilter";
import expectedResponseDisplayGroups from '../mock/displayGroups.json'


describe("/topology/actions", function () {

    afterAll(function () {
        fetchMock.restore();
    });

    it("test topology actions", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/topology/actions?nodeId=test", {
            status: 200,
            body: JSON.stringify(expectedResponseDisplayGroups)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const filter = {} as TopologyActionsFilter;
        filter.nodeId = "test";
        const response = await provider.getTopologyActions(filter);
        expect(response).toStrictEqual(expectedResponseDisplayGroups);
        expect(response.results.length).toBe(1);
        expect(response.results[0].requests.length).toBe(9);
    })
;
});
