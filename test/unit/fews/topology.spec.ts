import fetchMock from "fetch-mock";
import {
    PiWebserviceProvider
} from "../../../src";
import expectedResponseTopology from '../mock/topology.json'


describe("topology", function () {

    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/topology/nodes", {
            status: 200,
            body: JSON.stringify(expectedResponseTopology)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const nodes = await provider.getTopologyNodes();
        expect(nodes).toStrictEqual(expectedResponseTopology);
        expect(nodes.topologyNodes?.length).toBe(14)
        expect(nodes.topologyNodes[0].id).toBe("Algemeen")
        expect(nodes.topologyNodes[0].name).toBe("Algemeen")
        expect(nodes.topologyNodes[0].workflowId).toBeUndefined()
    });
})