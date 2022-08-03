import {PiWebserviceProvider} from '../../src/piWebserviceRequests'

import expectedResponse from './mock/taskRuns.json'
import {TaskRunsResponse} from "../../src/response";
import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import {DocumentFormat} from "../../src";
import {TaskRunsFilter} from "../../src/requestParameters/taskRunsFilter";

describe("tasks/ID/taskruns", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/tasks/roadmapmc00:000001170/taskruns?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const id = 'roadmapmc00:000001170'
        const filter: TaskRunsFilter = {
            documentFormat: DocumentFormat.PI_JSON,
        }
        const results: TaskRunsResponse = await provider.getTaskRuns(id, filter);
        expect(results).toStrictEqual(expectedResponse);
        expect("taskRuns" in results).toBe(true);
        expect(results.taskRuns.length).toBe(176);
    });
});
