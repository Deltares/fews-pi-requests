import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'
import {DocumentFormat, ScheduledTasksFilter} from '../../../src/requestParameters'

import expectedResponse from '../mock/scheduledTasks.json'
import {ScheduledTasksResponse} from "../../../src/response";
import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";

describe("scheduledTasks", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/tasks/scheduled?documentFormat=PI_JSON", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: ScheduledTasksFilter = {
            documentFormat: DocumentFormat.PI_JSON,
        }
        const results: ScheduledTasksResponse = await provider.getScheduledTasks(filter);
        expect(results).toStrictEqual(expectedResponse);
        expect("tasks" in results).toBe(true);
        expect(results.tasks.length).toBe(40);
    });
});
