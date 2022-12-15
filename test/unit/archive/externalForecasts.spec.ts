import fetchMock from 'fetch-mock';
import expectedResponse from '../mock/externalForecasts.json'
import {DocumentFormat} from "../../../src/requestParameters/documentFormat";
import {PiArchiveWebserviceProvider} from "../../../src/piArchiveWebserviceProvider";
import {ExternalForecastsFilter} from '../../../src';

describe("archive/externalForecasts", function () {
    afterAll(function () {
        fetchMock.restore();
    });

    it("external forecasts when done", async function () {
        fetchMock.mock('https://mock.dev/fewswebservices/rest/fewspiservice/v1/archive/netcdfstorageforecasts?documentFormat=PI_JSON&requestedAttributes=source&requestedAttributes=verification_period&startTime=2022-12-01T00%3A00%3A00Z&endTime=2022-12-14T00%3A00%3A00Z&attribute(long_name)=waterlevel_stat_bias&attribute(system)=nz',
        {
            status: 200,
            body: JSON.stringify(expectedResponse)
        });

        const provider = new PiArchiveWebserviceProvider("https://mock.dev/fewswebservices")
        const filter: ExternalForecastsFilter = {
            documentFormat: DocumentFormat.PI_JSON,
            requestedAttributes: ['source', 'verification_period'],
            startTime: "2022-12-01T00:00:00Z",
            endTime: "2022-12-14T00:00:00Z",
            attribute: {
                'long_name': 'waterlevel_stat_bias',
                system: 'nz'
            }
        };
        const results = await provider.getExternalForecasts(filter);
        expect("externalNetCDFStorageForecasts" in results).toBe(true)
        expect(results.externalNetCDFStorageForecasts.length).toBe(294)
        expect(results).toStrictEqual(expectedResponse);
    });
});
