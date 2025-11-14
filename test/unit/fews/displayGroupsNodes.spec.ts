import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'

import fetchMock from "fetch-mock";
import expectedResponseDisplayGroupsNodes from '../mock/displayGroupsNodes.json'


import { describe, it, expect } from 'vitest';

describe("/displaygroups/nodes", function () {    it("test display groups nodes", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/displaygroups/nodes", {
            status: 200,
            body: JSON.stringify(expectedResponseDisplayGroupsNodes)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const response = await provider.getDisplayGroupsNodes();
        expect(response).toStrictEqual(expectedResponseDisplayGroupsNodes);
        expect(response.displayGroups.length).toBe(5);
        expect(response.displayGroups[4].plotNodes?.length).toBe(2);
        if (response.displayGroups.length == 5 && response.displayGroups[4].plotNodes?.length == 2) {
            expect(response.displayGroups[4].plotNodes[0].displayId).toBe('0');
            expect(response.displayGroups[4].plotNodes[0].displayName).toBe('test name');
        }
    })
});
