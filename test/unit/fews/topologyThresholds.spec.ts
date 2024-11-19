import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import {
    PiWebserviceProvider
} from "../../../src";
import expectedResponseTopologyThresholds from '../mock/topologyThresholds.json'


describe("topology tresholds", function () {

    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/topology/thresholds", {
            status: 200,
            body: JSON.stringify(expectedResponseTopologyThresholds)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const thresholds = await provider.getTopologyThresholds();
        expect(thresholds).toStrictEqual(expectedResponseTopologyThresholds);
        expect(thresholds.topologyNodes?.length).toBe(7)
        expect(thresholds.topologyNodes[0].id).toBe("viewer_rivers")
        expect(thresholds.topologyNodes[0].filterLocationsCount).toBe(1)
        expect(thresholds.topologyNodes[1].id).toBe("viewer_coastal")
        expect(thresholds.topologyNodes[1].topologyLocationIcon).toBe("coastal_site_data_red.gif")
        // another test
    });
})
