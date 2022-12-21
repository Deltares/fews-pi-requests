import {DocumentFormat, LocationsFilter, PiWebserviceProvider} from '../../../src'

import expectedResponse from '../mock/locations.geo.json'
import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";

describe("locations geojson", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/locations?documentFormat=GEO_JSON", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const locationsFilter: LocationsFilter = {
            documentFormat: DocumentFormat.GEO_JSON
        }
        const results = await provider.getGeoJsonLocations(locationsFilter);
        expect(results).toStrictEqual(expectedResponse);
        expect(results.type).toBe('FeatureCollection');
        expect("features" in results).toBe(true);
        expect(results.features.length).toBe(3);

    });
});
