import mock from "xhr-mock";
import {PiWebserviceProvider} from '../../src/pi-webservice-requests'
import {DocumentFormat, TaskRunsFilter} from '../../src/interfaces'

import expectedResponse from './mock/scheduledTasks.json'
import { TaskRunsResponse } from "../../src/response";

describe("tasks/ID/taskruns", function() {
  beforeEach(function() {
    mock.setup();
  });

  afterAll(function() {
    mock.teardown();
  });

  it("gets called when done", async function() {
    mock.get("https://mock.dev/fewswebservices/rest/fewspiservice/v1/tasks/roadmapmc00:000001170/taskruns?documentFormat=PI_JSON", {
      status: 200,
      body: JSON.stringify(expectedResponse)
    });

    const provider = new PiWebserviceProvider("https://mock.dev/fewswebservices")
    const doneCallback = jest.fn();

    const validate = function(results: TaskRunsResponse): void {
      expect(results).toStrictEqual(expectedResponse);
    }

    const id = 'roadmapmc00:000001170'
    const filter: TaskRunsFilter = {
      documentFormat: DocumentFormat.PI_JSON,
    }
    await provider.getTaskRuns(id, filter).then((results) => {
      validate(results)
      doneCallback()
    })

    expect(doneCallback).toHaveBeenCalled();
  });
});
