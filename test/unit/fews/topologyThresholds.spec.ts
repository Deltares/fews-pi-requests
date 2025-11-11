import fetchMock from "fetch-mock";
import {
    PiWebserviceProvider,
    TopologyThresholdFilter
} from "../../../src";
import expectedResponseTopologyThresholds from '../mock/topologyThresholds.json'
import expectedResponseTopologyThresholdsNode from '../mock/topologyThresholdsNode.json'
import {DocumentFormat} from "../../../src/requestParameters/documentFormat";

import { describe, it, expect } from 'vitest';

describe("topology tresholds", function () {    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/topology/thresholds?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedResponseTopologyThresholds)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: TopologyThresholdFilter = {
            documentFormat: DocumentFormat.PI_JSON
        }

        const thresholds = await provider.getTopologyThresholds(filter);
        expect(thresholds).toStrictEqual(expectedResponseTopologyThresholds);
        expect(thresholds.topologyNodes?.length).toBe(7)
        expect(thresholds.topologyNodes[0].id).toBe("viewer_rivers")
        expect(thresholds.topologyNodes[0].filterLocationsCount).toBe(1)
        expect(thresholds.topologyNodes[1].id).toBe("viewer_coastal")
        expect(thresholds.topologyNodes[1].topologyLocationIcon).toBe("coastal_site_data_red.gif")
    });
})

describe("topology tresholds with node ID", function () {    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/topology/thresholds?documentFormat=PI_JSON&nodeId=viewer.main.coastal.waverunup", {
            status: 200,
            body: JSON.stringify(expectedResponseTopologyThresholdsNode)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: TopologyThresholdFilter = {
            documentFormat: DocumentFormat.PI_JSON,
            nodeId: "viewer.main.coastal.waverunup"
        }

        const thresholds = await provider.getTopologyThresholds(filter);
        expect(thresholds).toStrictEqual(expectedResponseTopologyThresholdsNode);
        expect(thresholds.topologyNodes?.length).toBe(1)
        expect(thresholds.topologyNodes[0].id).toBe("viewer.main.coastal.waverunup")

        const expectedCount = expectedResponseTopologyThresholdsNode.topologyNodes[0].filterLocationsCount
        expect(thresholds.topologyNodes[0].filterLocationsCount).toBe(expectedCount)
        expect(thresholds.topologyNodes[0].aggregatedLevelThresholdCrossings?.length).toBe(expectedCount)
        expect(thresholds.topologyNodes[0].levelThresholdCrossings?.length).toBe(expectedCount)

        expect(thresholds.topologyNodes[0].aggregatedLevelThresholdWarningLevels?.length).toBe(4)
        expect(thresholds.topologyNodes[0].levelThresholdWarningLevels?.length).toBe(4)
    });
})
