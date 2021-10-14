import mock from "xhr-mock";
import {PiWebserviceProvider} from '../../src/pi-webservice-requests'
import {ArchiveLocationsFilter, DocumentFormat, LocationsResponse} from '../../src/interfaces'

import expectedResponse from './mock/locations.json'

describe("archive/locations", function() {
  beforeEach(function() {
    mock.setup();
  });

  afterAll(function() {
    mock.teardown();
  });

  it("gets called when done", async function() {
    mock.get("http://fewswebservices/rest/fewspiservice/v1/archive/locations?documentFormat=PI_JSON&parameterIds=waterlevel_stat_bias", {
      status: 200,
      body: JSON.stringify(expectedResponse)
    });

    const provider = new PiWebserviceProvider("http://mock.dev")
    const doneCallback = jest.fn();

    const validate = function(results: LocationsResponse): void {
      expect(results).toStrictEqual(expectedResponse);
    }

    const filter: ArchiveLocationsFilter = {
      documentFormat: DocumentFormat.PI_JSON,
      parameterIds: "waterlevel_stat_bias"
    }
    await provider.getArchiveLocations(filter).then((results) => {
      validate(results)
      doneCallback()
    })

    expect(doneCallback).toHaveBeenCalled();
  });
});
