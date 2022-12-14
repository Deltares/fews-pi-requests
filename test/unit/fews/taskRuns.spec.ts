import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'

import expectedResponse from '../mock/taskRuns.json'
import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import {DocumentFormat} from "../../../src";
import {TaskRunsFilter} from "../../../src/requestParameters/taskRunsFilter";

describe("tasks/ID/taskruns", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/taskruns?onlyCurrent=true&documentFormat=PI_JSON&onlyForecasts=false", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: TaskRunsFilter = {
            onlyCurrent: true,
            documentFormat: DocumentFormat.PI_JSON,
            onlyForecasts: false
        }
        const results = await provider.getTaskRuns(filter);
        expect(results).toStrictEqual(expectedResponse);
        expect("taskRuns" in results).toBe(true);
        expect(results.taskRuns.length).toBe(2);
    });
});
