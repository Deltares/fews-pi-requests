import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'

import fetchMock from "fetch-mock";
import {LocationsTooltipFilter} from '../../../src/requestParameters';

import { describe, it, expect } from 'vitest';

describe("locationsTooltip", function () {    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/locations/tooltip?filterId=filter1&locationId=location1", {
            status: 200,
            body: '<html><h1>Hello Web OC</h1></html>'
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: LocationsTooltipFilter = {
            filterId: "filter1",
            locationId: "location1"

        }
        const tooltip = await provider.getLocationsTooltip(filter);
        expect(tooltip).toStrictEqual('<html><h1>Hello Web OC</h1></html>');
    });
});
