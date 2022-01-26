import mock from "xhr-mock";
import {PiWebserviceProvider} from '../../src/pi-webservice-requests'
import {DocumentFormat, ModuleRuntimesFilter } from '../../src/interfaces'

import expectedResponse from './mock/moduleRunTimes.json'
import { ModuleRuntimesResponse } from "../../src/response";

describe("moduleruntimes", function() {
  beforeEach(function() {
    mock.setup();
  });

  afterAll(function() {
    mock.teardown();
  });

  it("gets called when done", async function() {
    mock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/tasks/moduleruntimes?documentFormat=PI_JSON", {
      status: 200,
      body: JSON.stringify(expectedResponse)
    });

    const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
    const doneCallback = jest.fn();

    const validate = function(results: ModuleRuntimesResponse): void {
      expect(results).toStrictEqual(expectedResponse);
    }

    const filter: ModuleRuntimesFilter = {
      documentFormat: DocumentFormat.PI_JSON,
    }
    await provider.getModuleRuntimes(filter).then((results) => {
      validate(results)
      doneCallback()
    })

    expect(doneCallback).toHaveBeenCalled();
  });
});
