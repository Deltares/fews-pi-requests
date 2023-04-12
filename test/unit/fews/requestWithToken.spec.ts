import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import {PiWebserviceProvider} from "../../../src";
import {DisplayGroupsFilter} from "../../../src/requestParameters/DisplayGroupsFilter";
import expectedResponseDisplayGroups from '../mock/displayGroups.json'
import expectedImportStatusResponse from '../mock/importStatus.json'

async function transformRequest(request: Request): Promise<Request> {
    const requestInit: RequestInit = {
        // Only some of the properties of RequestInit are used by fetch-mock, such as 'headers'.
        headers: { 
            'Content-Type': "application/json",
            'Authorization': "Bearer 123"
        },
    }
    const newRequest = new Request(request, requestInit)
    return newRequest
}

describe("archive/locations", function () {
    afterAll(function () {
        fetchMock.restore();
    });
    it('test token with cache option', async function () {
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


        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/displaygroups?nodeId=test", {
            status: 200,
            body: JSON.stringify(expectedResponseDisplayGroups)
        }, {
            headers: {
                "Authorization": "Bearer 123"
            }
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices", {transformRequestFn: transformRequest})

        const filter = {} as DisplayGroupsFilter;
        filter.nodeId = "test";
        const response = await provider.getDisplayGroupsTimeSeriesInfo(filter);
        expect(response).toStrictEqual(expectedResponseDisplayGroups);
        expect(response.results.length).toBe(1);
        expect(response.results[0].requests.length).toBe(9);

    })
});
