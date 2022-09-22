import {TopologyNodeResponse} from "../../src/response/topology/topologyNodeResponse"
import expectedResponseTopology from './mock/topology.json'
import expectedResponseDisplayGroups from './mock/displayGroups.json'
import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import {PiWebserviceProvider} from "../../src";
import {DisplayGroupsFilter} from "../../src/requestParameters/DisplayGroupsFilter";
import {DisplayGroupsResponse} from "../../src/response/displaygroups/displayGroupsResponse";

describe("tasks/ID/taskruns", function () {
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
    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/topology/nodes", {
            status: 200,
            body: JSON.stringify(expectedResponseTopology)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const nodes: TopologyNodeResponse = await provider.getTopologyNodes();
        expect(nodes).toStrictEqual(expectedResponseTopology);
        expect(nodes.topologyNodes.length).toBe(14)
        expect(nodes.topologyNodes[0].id).toBe("Algemeen")
        expect(nodes.topologyNodes[0].name).toBe("Algemeen")
        expect(nodes.topologyNodes[0].workflowId).toBeUndefined()
    });
});
