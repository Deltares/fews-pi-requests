import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'

import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import { RunTaskFilter } from '../../../src/requestParameters';

describe("runtask", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("generates a valid runtask POST request", async function () {
        const workflowId = 'ImportObserved'
        const startTime = '2014-01-01T00:00:00Z+0000'
        const timeZero = '2014-01-01T00:00:00Z+0000'
        const endTime = '2014-01-01T00:30:00Z+0000'
        const fileName = 'exportFile'
        const outputValue = 9.0

        const expectedResponse = "1_0"

        fetchMock.post("https://mock.dev/fewswebservices/rest/fewspiservice/v1/runtask?workflowId=ImportObserved&startTime=2014-01-01T00%3A00%3A00Z%2B0000&timeZero=2014-01-01T00%3A00%3A00Z%2B0000&endTime=2014-01-01T00%3A30%3A00Z%2B0000&property(fileName)=exportFile&property(outputValue)=9", {
            status: 200,
            body: expectedResponse
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: RunTaskFilter = {
            workflowId, startTime, timeZero, endTime, properties: { fileName, outputValue }
        }
        const results = await provider.postRunTask(filter, '');
        expect(results).toStrictEqual(expectedResponse);
    });
});
