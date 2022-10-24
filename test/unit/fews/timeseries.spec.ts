import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'
import {TimeSeriesResponse} from '../../../src/response'
import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import expectedResponse from '../mock/timeseries.json'
import {TimeSeriesFilter} from "../../../src/requestParameters/timeSeriesFilter";
import {DocumentFormat} from "../../../src";
import {TimeSeriesType} from "../../../src/requestParameters/timeSeriesType";

describe("archive/locations", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/timeseries?documentFormat=PI_JSON&importFromExternalDataSource=true&timeSeriesType=EXTERNAL_FORECASTING&parameterIds=waterlevel_stat_bias&locationIds=delfzijl&locationIds=den_helder&moduleInstanceIds=dcsm6zuno4_hirlam&moduleInstanceIds=dcsm6zuno4_hirlam_kf&startForecastTime=2020-10-16T00%3A00%3A00Z&endForecastTime=2020-10-16T00%3A00%3A00Z&forecastCount=1&qualifierIds=verification_period=7d", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

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
        const results: TimeSeriesResponse = await provider.getTimeSeries(filter);
        expect(results).toStrictEqual(expectedResponse);
        expect("timeSeries" in results).toBe(true);
        expect(results.timeSeries.length).toBe(4);
    });
});
