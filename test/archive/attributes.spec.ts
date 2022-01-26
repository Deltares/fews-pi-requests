import mock from "xhr-mock";
import {PiWebserviceProvider} from '../../src/pi-webservice-requests'
import {DocumentFormat, AttributesFilter, AttributesResponse} from '../../src/interfaces'

import expectedResponse from './mock/locations.json'

describe("archive/locations", function() {
  beforeEach(function() {
    mock.setup();
  });

  afterAll(function() {
    mock.teardown();
  });

  it("gets called when done", async function() {
    mock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/archive/attributes?documentFormat=PI_JSON&parameterIds=waterlevel_stat_bias&locationIds=delfzijl&attributes=source", {
      status: 200,
      body: JSON.stringify(expectedResponse)
    });

    const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
    const doneCallback = jest.fn();

    const validate = function(results: AttributesResponse): void {
      expect(results).toStrictEqual(expectedResponse);
    }

    const filter: AttributesFilter = {
      documentFormat: DocumentFormat.PI_JSON,
      parameterIds: "waterlevel_stat_bias",
      locationIds: "delfzijl",
      attributes: 'source',
    }
    await provider.getAttributes(filter).then((results) => {
      validate(results)
      doneCallback()
    })

    expect(doneCallback).toHaveBeenCalled();
  });
});
