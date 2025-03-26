import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'
import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import expectedResponse from '../mock/timeseries.json'
import {TimeSeriesFilter} from "../../../src/requestParameters/timeSeriesFilter";
import {DocumentFormat} from "../../../src";
import {TimeSeriesType} from "../../../src/requestParameters/timeSeriesType";

const filter: TimeSeriesFilter = {
    documentFormat: DocumentFormat.PI_JSON,
    importFromExternalDataSource: true,
    timeSeriesType: TimeSeriesType.EXTERNAL_FORECASTING,
    parameterIds: 'waterlevel_stat_bias',
    locationIds: ['delfzijl', 'den_helder'],
    moduleInstanceIds: ['dcsm6zuno4_hirlam', 'dcsm6zuno4_hirlam_kf'],
    startForecastTime: '2020-10-16T00:00:00Z',
    endForecastTime: '2020-10-16T00:00:00Z',
    forecastCount: 1,
    qualifierIds: {
        'verification_period': '7d'
    }
}

describe("timeseries", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("timeseries json response", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/timeseries?documentFormat=PI_JSON&importFromExternalDataSource=true&timeSeriesType=EXTERNAL_FORECASTING&parameterIds=waterlevel_stat_bias&locationIds=delfzijl&locationIds=den_helder&moduleInstanceIds=dcsm6zuno4_hirlam&moduleInstanceIds=dcsm6zuno4_hirlam_kf&startForecastTime=2020-10-16T00%3A00%3A00Z&endForecastTime=2020-10-16T00%3A00%3A00Z&forecastCount=1&qualifierIds=verification_period%3D7d", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const results = await provider.getTimeSeries(filter);
        expect(results).toStrictEqual(expectedResponse);
        expect("timeSeries" in results).toBe(true);
        expect(results?.timeSeries?.length).toBe(4);
        if (results?.timeSeries?.length === 4 && results?.timeSeries[0].events?.length === 5) {
            expect(results.timeSeries[0].events[0].flagSource).toBe("MAN");
            expect(results.timeSeries[0].events[0].flag).toBe("0");
            expect(results.timeSeries[0].events[0].valueSource).toBe("MAN");
            expect(results.timeSeries[0].events[0].state).toBe("dried");
        }
    });

    it("timeseries string qualifierIds", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/timeseries?documentFormat=PI_JSON&importFromExternalDataSource=true&timeSeriesType=EXTERNAL_FORECASTING&parameterIds=waterlevel_stat_bias&locationIds=delfzijl&locationIds=den_helder&moduleInstanceIds=dcsm6zuno4_hirlam&moduleInstanceIds=dcsm6zuno4_hirlam_kf&startForecastTime=2020-10-16T00%3A00%3A00Z&endForecastTime=2020-10-16T00%3A00%3A00Z&forecastCount=1&qualifierIds=a%2Cb%2Cc", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const results = await provider.getTimeSeries({
            ...filter,
            qualifierIds: 'a,b,c'
        });
        expect(results).toStrictEqual(expectedResponse);
    });

    it("timeseries string array qualifierIds", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/timeseries?documentFormat=PI_JSON&importFromExternalDataSource=true&timeSeriesType=EXTERNAL_FORECASTING&parameterIds=waterlevel_stat_bias&locationIds=delfzijl&locationIds=den_helder&moduleInstanceIds=dcsm6zuno4_hirlam&moduleInstanceIds=dcsm6zuno4_hirlam_kf&startForecastTime=2020-10-16T00%3A00%3A00Z&endForecastTime=2020-10-16T00%3A00%3A00Z&forecastCount=1&qualifierIds=d&qualifierIds=e&qualifierIds=f", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const results = await provider.getTimeSeries({
            ...filter,
            qualifierIds: ['d', 'e', 'f']
        });
        expect(results).toStrictEqual(expectedResponse);
    });
});

describe("timeseries with transform request", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("timeseries json response with transform request", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/timeseries?documentFormat=PI_JSON&importFromExternalDataSource=true&timeSeriesType=EXTERNAL_FORECASTING&parameterIds=waterlevel_stat_bias&locationIds=delfzijl&locationIds=den_helder&moduleInstanceIds=dcsm6zuno4_hirlam&moduleInstanceIds=dcsm6zuno4_hirlam_kf&startForecastTime=2020-10-16T00%3A00%3A00Z&endForecastTime=2020-10-16T00%3A00%3A00Z&forecastCount=1&qualifierIds=verification_period%3D7d", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        }, {
            headers: {
                "Authorization": "Bearer 123"
            }
        });

        async function transformRequest(request: Request): Promise<Request> {
            const newRequest = new Request(request)
            // Only some of the properties of RequestInit are used by fetch-mock, such as 'headers'.
            newRequest.headers.set('Authorization', 'Bearer 123')
            newRequest.headers.set('Content-Type', 'application/json')
            return newRequest
        }

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices", {transformRequestFn: transformRequest})

        const results = await provider.getTimeSeries(filter);
        expect(results).toStrictEqual(expectedResponse);
        expect("timeSeries" in results).toBe(true);
        expect(results?.timeSeries?.length).toBe(4);
        if (results?.timeSeries?.length === 4 && results?.timeSeries[0].events?.length === 5) {
            expect(results.timeSeries[0].events[0].flagSource).toBe("MAN");
            expect(results.timeSeries[0].events[0].flag).toBe("0");
            expect(results.timeSeries[0].events[0].valueSource).toBe("MAN");
            expect(results.timeSeries[0].events[0].state).toBe("dried");
        }
    });
});
