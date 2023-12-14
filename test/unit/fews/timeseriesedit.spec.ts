import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'

import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import type { TimeSeriesResponse } from "../../../src";

describe("timeseries/edit", function () {

    afterAll(function () {
        fetchMock.restore();
    });
    it("post events using time series index and location id", async function () {
        fetchMock.post("https://mock.dev/fewswebservices/rest/fewspiservice/v1/timeseries/edit?timeSeriesSetIndex=1&locationId=2", {
            status: 200,
            body: 'uploaded'
        });
        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
        const timeSeries: TimeSeriesResponse = {
            "version": "1.23",
            "timeZone": "0.0",
            "timeSeries": [
                {
                    "events": [{
                        "date": "2013-12-30",
                        "time": "00:00:00",
                        "value": "20.0",
                        "comment": "test",
                        "flag": "8",
                        "flagSource": "MAN"
                    }]

                }
            ]
        }
        const url = 'https://mock.dev/fewswebservices/rest/fewspiservice/v1/timeseries/edit?timeSeriesSetIndex=1&locationId=2'
        const results = await provider.postTimeSeriesEdit(url, timeSeries);
        expect(results).toStrictEqual('uploaded');
    });

    it("post multiple events using time series index and location id and ensemble", async function () {
        fetchMock.post("https://mock.dev/fewswebservices/rest/fewspiservice/v1/timeseries/edit?timeSeriesSetIndex=3&locationId=4&ensembleId=1&ensembleMemberId=2", {
            status: 200,
            body: 'uploaded'
        });
        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
        const timeSeries: TimeSeriesResponse = {
            "version": "1.23",
            "timeZone": "0.0",
            "timeSeries": [
                {
                    "events": [
                        {
                        "date": "2013-12-29",
                        "time": "00:00:00",
                        "value": "18.0",
                        "comment": "testje",
                        "flag": "1",
                        "flagSource": "MAN"
                    },
                    {
                        "date": "2013-12-30",
                        "time": "00:00:00",
                        "value": "20.0",
                        "comment": "test",
                        "flag": "8",
                        "flagSource": "MAN"
                    }]
                }
            ]
        }
        const url = 'https://mock.dev/fewswebservices/rest/fewspiservice/v1/timeseries/edit?timeSeriesSetIndex=3&locationId=4&ensembleId=1&ensembleMemberId=2'
        const results = await provider.postTimeSeriesEdit(url, timeSeries);
        expect(results).toStrictEqual('uploaded');
    });

    it("post events using time series index and location id", async function () {
        fetchMock.post("https://mock.dev/fewswebservices/rest/fewspiservice/v1/timeseries/edit?timeSeriesSetIndex=5&locationId=2", {
            status: 200,
            body: 'uploaded'
        });
        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
        const timeSeries: TimeSeriesResponse = {
            "version": "1.23",
            "timeZone": "0.0",
            "timeSeries": [
                {
                    "events": [{
                        "date": "2013-12-30",
                        "time": "00:00:00",
                        "value": "20.0",
                        "comment": "test",
                        "flag": "8",
                        "flagSource": "MAN"
                    }]

                }
            ]
        }
        const url = 'https://mock.dev/fewswebservices/rest/fewspiservice/v1/timeseries/edit?timeSeriesSetIndex=5&locationId=2'
        const results = await provider.postTimeSeriesEdit(url, timeSeries);
        expect(results).toStrictEqual('uploaded');
    });
    it("post events with relative url", async function () {
        fetchMock.post("rest/fewspiservice/v1/timeseries/edit?timeSeriesSetIndex=1&locationId=2", {
            status: 200,
            body: 'uploaded'
        });
        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
        const timeSeries: TimeSeriesResponse = {
            "version": "1.23",
            "timeZone": "0.0",
            "timeSeries": [
                {
                    "events": [{
                        "date": "2013-12-30",
                        "time": "00:00:00",
                        "value": "20.0",
                        "comment": "test",
                        "flag": "8",
                        "flagSource": "MAN"
                    }]

                }
            ]
        }
        const url = 'rest/fewspiservice/v1/timeseries/edit?timeSeriesSetIndex=1&locationId=2'
        const results = await provider.postTimeSeriesEdit(url, timeSeries);
        expect(results).toStrictEqual('uploaded');
    });

});

describe("timeseries/edit with transformRequest", function () {

    afterAll(function () {
        fetchMock.restore();
    });
    it("post events using time series index and location id", async function () {
        fetchMock.post("https://mock.dev/fewswebservices/rest/fewspiservice/v1/timeseries/edit?timeSeriesSetIndex=1&locationId=2", {
            status: 200,
            body: 'uploaded'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        async function transformRequest(request: Request): Promise<Request> {
            const requestInit: RequestInit = {
                // Only some of the properties of RequestInit are used by fetch-mock, such as 'headers'.
                headers: { },
            }
            const newRequest = new Request(request, requestInit)
            return newRequest
        }

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices", {transformRequestFn: transformRequest})
        const timeSeries: TimeSeriesResponse = {
            "version": "1.23",
            "timeZone": "0.0",
            "timeSeries": [
                {
                    "events": [{
                        "date": "2013-12-30",
                        "time": "00:00:00",
                        "value": "20.0",
                        "comment": "test",
                        "flag": "8",
                        "flagSource": "MAN"
                    }]

                }
            ]
        }
        const url = 'https://mock.dev/fewswebservices/rest/fewspiservice/v1/timeseries/edit?timeSeriesSetIndex=1&locationId=2'
        const results = await provider.postTimeSeriesEdit(url, timeSeries);
        expect(results).toStrictEqual('uploaded');
    });
});
