import {PiWebserviceProvider} from '../../../src/piWebserviceProvider'

import 'cross-fetch/polyfill';
import fetchMock from "fetch-mock";
import expectedResponse from '../mock/timeseriesgrid.json'
import {TimeSeriesGridFilter} from "../../../src/requestParameters/timeSeriesGridFilter";
import {DocumentFormat} from "../../../src";


describe("archive/locations", function () {

    afterAll(function () {
        fetchMock.restore();
    });

    it("gets called when done", async function () {
        fetchMock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/timeseries/grid?documentFormat=PI_JSON&layers=-knmi_harmonie40--air_pressure_fixed_height-&x=469168.1587130217&y=6773416.739869252&startTime=2020-12-22T21%3A00%3A00.000Z&endTime=2020-12-22T21%3A00%3A00.000Z&bbox=233081.51067565128%2C6437014.8860724205%2C1028684.8666990183%2C6955886.640000704&importFromExternalDataSource=true&externalForecastTime=2020-12-20T21%3A00%3A00.000Z", {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")

        const filter: TimeSeriesGridFilter = {
            documentFormat: DocumentFormat.PI_JSON,
            layers: '-knmi_harmonie40--air_pressure_fixed_height-',
            x: 469168.1587130217,
            y: 6773416.739869252,
            startTime: '2020-12-22T21:00:00.000Z',
            endTime: '2020-12-22T21:00:00.000Z',
            bbox: [233081.51067565128, 6437014.8860724205, 1028684.8666990183, 6955886.640000704],
            importFromExternalDataSource: true,
            externalForecastTime: '2020-12-20T21:00:00.000Z'
        }
        const results = await provider.getTimeSeriesGrid(filter);
        expect(results).toStrictEqual(expectedResponse);
        expect("timeSeries" in results).toBe(true);
        expect(results?.timeSeries?.length).toBe(1);
    });
});
