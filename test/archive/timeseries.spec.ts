import mock from "xhr-mock";
import {PiWebserviceProvider} from '../../src/pi-webservice-requests'
import {TimeSeriesFilter, DocumentFormat, TimeSeriesResponse, TimeSeriesType} from '../../src/interfaces'

import expectedResponse from './mock/timeseries.json'

describe("archive/locations", function() {
  beforeEach(function() {
    mock.setup();
  });

  afterAll(function() {
    mock.teardown();
  });

  it("gets called when done", async function() {
    mock.get("https://fewswebservices/rest/fewspiservice/v1/timeseries?documentFormat=PI_JSON&importFromExternalDataSource=true&timeSeriesType=EXTERNAL_FORECASTING&parameterIds=waterlevel_stat_bias&locationIds=delfzijl&locationIds=den_helder&moduleInstanceIds=dcsm6zuno4_hirlam&moduleInstanceIds=dcsm6zuno4_hirlam_kf&startForecastTime=2020-10-16T00%3A00%3A00Z&endForecastTime=2020-10-16T00%3A00%3A00Z&forecastCount=1&qualifierIds=verification_period%3D7d", {
      status: 200,
      body: JSON.stringify(expectedResponse)
    });

    const provider = new PiWebserviceProvider("https://mock.dev")
    const doneCallback = jest.fn();

    const validate = function(results: TimeSeriesResponse): void {
      expect(results).toStrictEqual(expectedResponse);
    }

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
    await provider.getTimeSeries(filter).then((results) => {
      validate(results)
      doneCallback()
    })

    expect(doneCallback).toHaveBeenCalled();
  });
});
