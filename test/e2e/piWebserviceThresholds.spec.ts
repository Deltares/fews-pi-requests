import {
    PiWebserviceProvider,
    TopologyThresholdFilter
} from "../../src";
import { describe, it, expect } from 'vitest';

const baseUrl = import.meta.env.VITE_DOCKER_URL || "";

describe("pi webservice thresholds", function () {

    it("get all topology thresholds", async function () {
        const provider = new PiWebserviceProvider(baseUrl);
        const filter: TopologyThresholdFilter = {}
        const res = await provider.getTopologyThresholds(filter);
        expect(res?.topologyNodes?.length).toBeGreaterThan(7);

        const topologyNode1 = res.topologyNodes.find(item => item.id === 'viewer_rivers_level_stations');
        expect(topologyNode1?.filterLocationsCount).toEqual(4);

        const topologyNode2 = res.topologyNodes.find(item => item.id === 'viewer_rivers_critical_points');
        expect(topologyNode2?.filterLocationsCount).toEqual(8);

    })

    it("get topology thresholds by nodeId", async function () {
        const provider = new PiWebserviceProvider(baseUrl);
        const filter: TopologyThresholdFilter = {
            nodeId: 'viewer_rivers'
        }
        const res= await provider.getTopologyThresholds(filter);
        expect(res?.topologyNodes?.length).toBeGreaterThan(0);
        expect(res.topologyNodes[0].filterLocationsCount).toEqual(12);
    })
})