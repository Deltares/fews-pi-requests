import {TopologyNodeResponse} from "../../src/response/topology/topologyNodeResponse"
import expectedResponse from './mock/topology.json'
import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import {PiWebserviceProvider} from "../../src";

describe("tasks/ID/taskruns", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/topology/nodes", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const nodes: TopologyNodeResponse = await provider.getTopologyNodes();
        expect(nodes).toStrictEqual(expectedResponse);
        expect(nodes.topologyNodes.length).toBe(14)
        expect(nodes.topologyNodes[0].id).toBe("Algemeen")
        expect(nodes.topologyNodes[0].name).toBe("Algemeen")
        expect(nodes.topologyNodes[0].workflowId).toBeUndefined()
    });
});
