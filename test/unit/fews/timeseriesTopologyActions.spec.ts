import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'

import fetchMock from "fetch-mock";
import expectedResponse from '../mock/timeseries.json'
import {DocumentFormat, TimeSeriesTopologyActionsFilter} from "../../../src";

import { describe, it, expect } from 'vitest';

describe("timeseries/topology/actions", function () {    it("gets timeseries from topology actions response", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/timeseries/topology/actions?documentFormat=PI_JSON&startTime=2020-12-22T21%3A00%3A00.000Z&endTime=2020-12-22T21%3A00%3A00.000Z&nodeId=testNode&timeSeriesDisplayIndex=0&downloadAsFile=true", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: TimeSeriesTopologyActionsFilter = {
            documentFormat: DocumentFormat.PI_JSON,
            startTime: '2020-12-22T21:00:00.000Z',
            endTime: '2020-12-22T21:00:00.000Z',
            nodeId: 'testNode',
            timeSeriesDisplayIndex: 0,
            downloadAsFile: true
        }
        const results = await provider.getTimeSeriesTopologyActions(filter);
        expect(results).toStrictEqual(expectedResponse);
        expect("timeSeries" in results).toBe(true);
        expect(results?.timeSeries?.length).toBe(4);
    });
});
