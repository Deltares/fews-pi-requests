import mock from "xhr-mock";
import {PiWebserviceProvider} from '../../src/pi-webservice-requests'
import {ParametersFilter, DocumentFormat, ParametersResponse} from '../../src/interfaces'

import expectedResponse from './mock/parameters.json'

describe("archive/parameters", function() {
  beforeEach(function() {
    mock.setup();
  });

  afterAll(function() {
    mock.teardown();
  });

  it("gets called when done", async function() {
    mock.get("http://fewswebservices/rest/fewspiservice/v1/archive/parameters?documentFormat=PI_JSON&locationIds=delfzijl", {
      status: 200,
      body: JSON.stringify(expectedResponse)
    });

    const provider = new PiWebserviceProvider("http://mock.dev")
    const doneCallback = jest.fn();

    const validate = function(results: ParametersResponse): void {
      expect(results).toStrictEqual(expectedResponse);
    }

    const filter: ParametersFilter = {
      documentFormat: DocumentFormat.PI_JSON,
      locationIds: "delfzijl"
    }
    await provider.getParameters(filter).then((results) => {
      validate(results)
      doneCallback()
    })

    expect(doneCallback).toHaveBeenCalled();
  });
});
