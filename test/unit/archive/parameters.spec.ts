import {ArchiveParameters} from '../../../src/response'
import fetchMock from 'fetch-mock';

import expectedResponse from '../mock/archive/parameters.json'
import {PiArchiveWebserviceProvider} from "../../../src/piArchiveWebserviceProvider";
import {ArchiveParametersFilter} from "../../../src/requestParameters/archiveParametersFilter";
import {DocumentFormat} from "../../../src";

import { describe, it, expect } from 'vitest';

describe("archive/parameters", function () {    it("gets called when done", async function () {
        fetchMock.route("https://mock.dev/fewswebservices/rest/fewspiservice/v1/archive/parameters?documentFormat=PI_JSON&locationIds=delfzijl", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiArchiveWebserviceProvider("https://mock.dev/fewswebservices")
        const filter: ArchiveParametersFilter = {
            documentFormat: DocumentFormat.PI_JSON,
            locationIds: "delfzijl"
        }
        const results: ArchiveParameters = await provider.getParameters(filter);
        expect(results).toStrictEqual(expectedResponse);
        expect("parameters" in results).toBe(true);
        expect(results.parameters.length).toBe(13);
    });
});
