import mock from "xhr-mock";
import {PiWebserviceProvider} from '../../src/pi-webservice-requests'
import {DocumentFormat, ScheduledTasksFilter} from '../../src/interfaces'

import expectedResponse from './mock/scheduledTasks.json'
import { ScheduledTasksResponse } from "../../src/response";

describe("scheduledTasks", function() {
  beforeEach(function() {
    mock.setup();
  });

  afterAll(function() {
    mock.teardown();
  });

  it("gets called when done", async function() {
    mock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/tasks/scheduled?documentFormat=PI_JSON", {
      status: 200,
      body: JSON.stringify(expectedResponse)
    });

    const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
    const doneCallback = jest.fn();

    const validate = function(results: ScheduledTasksResponse): void {
      expect(results).toStrictEqual(expectedResponse);
    }

    const filter: ScheduledTasksFilter = {
      documentFormat: DocumentFormat.PI_JSON,
    }
    await provider.getScheduledTasks(filter).then((results) => {
      validate(results)
      doneCallback()
    })

    expect(doneCallback).toHaveBeenCalled();
  });
});
