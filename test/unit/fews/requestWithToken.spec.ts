import fetchMock from "fetch-mock";
import {PiWebserviceProvider} from "../../../src";
import {TopologyActionFilter} from "../../../src/requestParameters/topologyActionFilter";
import expectedResponseDisplayGroups from '../mock/displayGroups.json'
import expectedImportStatusResponse from '../mock/importStatus.json'

import { describe, it, expect } from 'vitest';

async function transformRequest(request: Request): Promise<Request> {
    const newRequest = new Request(request)
    // Only some of the properties of RequestInit are used by fetch-mock, such as 'headers'.
    newRequest.headers.set('Authorization', 'Bearer 123')
    newRequest.headers.set('Content-Type', 'application/json')
    return newRequest
}

describe("archive/locations", function () {    it('test token with cache option', async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/import/status?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedImportStatusResponse)
        }, {
            headers: {
                "Authorization": "Bearer 123"
            }
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices", {transformRequestFn: transformRequest})

        const results = await provider.getImportStatus();
        expect(results).toStrictEqual(expectedImportStatusResponse);
        expect("importStatus" in results).toBe(true);
        expect(results.importStatus.length).toBe(87);
    });
    it("test token", async function () {


        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/topology/actions?nodeId=test", {
            status: 200,
            body: JSON.stringify(expectedResponseDisplayGroups)
        }, {
            headers: {
                "Authorization": "Bearer 123"
            }
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices", {transformRequestFn: transformRequest})

        const filter = {} as TopologyActionFilter;
        filter.nodeId = "test";
        const response = await provider.getTopologyActions(filter);
        expect(response).toStrictEqual(expectedResponseDisplayGroups);
        expect(response.results.length).toBe(1);
        expect(response.results[0].requests.length).toBe(9);

    })
});
