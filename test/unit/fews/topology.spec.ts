import fetchMock from "fetch-mock";
import {
    PiWebserviceProvider
} from "../../../src";
import expectedResponseTopology from '../mock/topology.json'


import { describe, it, expect } from 'vitest';

describe("topology", function () {    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/topology/nodes", {
            status: 200,
            body: JSON.stringify(expectedResponseTopology)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const nodes = await provider.getTopologyNodes();
        expect(nodes).toStrictEqual(expectedResponseTopology);
        expect(nodes.topologyNodes?.length).toBe(4)
        expect(nodes.topologyNodes[0].id).toBe("Information_Sources")
        expect(nodes.topologyNodes[0].name).toBe("Information Sources")
        expect(nodes.topologyNodes[0].workflowId).toBeUndefined()
        expect(nodes.topologyNodes[0].topologyNodes?.length).toBe(4)
        if (nodes.topologyNodes[0].topologyNodes?.length == 4) {
            expect(nodes.topologyNodes[0].topologyNodes[0].displayGroups?.length).toBe(1)
            if (nodes.topologyNodes[0].topologyNodes[0].displayGroups?.length == 1) {
                expect(nodes.topologyNodes[0].topologyNodes[0].workflowId).toBe('Test Workflow ID')
                expect(nodes.topologyNodes[0].topologyNodes[0].url).toBe('https://publicwiki.deltares.nl/display/FEWSDOC/Home')
                expect(nodes.topologyNodes[0].topologyNodes[0].displayGroups[0].displayGroupId).toBe('Test Display Group ID1')
                expect(nodes.topologyNodes[0].topologyNodes[0].displayGroups[0].plotNodes?.length).toBe(13)
                if (nodes.topologyNodes[0].topologyNodes[0].displayGroups[0].plotNodes?.length == 13) {
                    expect(nodes.topologyNodes[0].topologyNodes[0].displayGroups[0]?.plotNodes[0].displayId).toBe('0')
                    expect(nodes.topologyNodes[0].topologyNodes[0].displayGroups[0]?.plotNodes[0].displayName).toBe('L\'Elnes')
                }
            }

        }
    });
})