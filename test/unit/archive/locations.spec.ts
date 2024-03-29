import 'cross-fetch/polyfill';
import fetchMock from 'fetch-mock';

import expectedResponse from '../mock/locations.json'
import {ArchiveLocationsFilter} from "../../../src/requestParameters/archiveLocationsFilter";
import {DocumentFormat} from "../../../src/requestParameters/documentFormat";
import {PiArchiveWebserviceProvider} from "../../../src/piArchiveWebserviceProvider";

describe("archive/locations", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.mock("https://mock.dev/fewswebservices/rest/fewspiservice/v1/archive/locations?documentFormat=PI_JSON&parameterIds=waterlevel_stat_bias", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiArchiveWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: ArchiveLocationsFilter = {
            documentFormat: DocumentFormat.PI_JSON,
            parameterIds: "waterlevel_stat_bias"
        }
        const results = await provider.getLocations(filter);
        expect(results).toStrictEqual(expectedResponse);
        expect("locations" in results).toBe(true)
        expect(results.locations.length).toBe(6)
    });
});
