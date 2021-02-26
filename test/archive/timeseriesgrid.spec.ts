import mock from "xhr-mock";
import {PiWebserviceProvider} from '../../src/pi-webservice-requests'
import {TimeSeriesGridFilter, DocumentFormat, TimeSeriesResponse} from '../../src/interfaces'

import expectedResponse from './mock/timeseriesgrid.json'

describe("archive/locations", function() {
  beforeEach(function() {
    mock.setup();
  });

  afterAll(function() {
    mock.teardown();
  });

  it("gets called when done", async function() {
    mock.get("https://fewswebservices/rest/fewspiservice/v1/timeseries/grid?documentFormat=PI_JSON&layers=-knmi_harmonie40--air_pressure_fixed_height-&x=469168.1587130217&y=6773416.739869252&startTime=2020-12-22T21%3A00%3A00.000Z&endTime=2020-12-22T21%3A00%3A00.000Z&bbox=233081.51067565128%2C6437014.8860724205%2C1028684.8666990183%2C6955886.640000704&importFromExternalDataSource=true&externalForecastTime=2020-12-20T21%3A00%3A00.000Z", {
      status: 200,
      body: JSON.stringify(expectedResponse)
    });

    const provider = new PiWebserviceProvider("https://mock.dev")
    const doneCallback = jest.fn();

    const validate = function(results: TimeSeriesResponse): void {
      expect(results).toStrictEqual(expectedResponse);
    }

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
    await provider.getTimeSeriesGrid(filter).then((results) => {
      validate(results)
      doneCallback()
    })

    expect(doneCallback).toHaveBeenCalled();
  });
});
